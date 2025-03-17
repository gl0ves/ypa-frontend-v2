<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Paragraph from '@tiptap/extension-paragraph';
	import OrderedList from '@tiptap/extension-ordered-list';
	import Link from '@tiptap/extension-link';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Dropcursor from '@tiptap/extension-dropcursor';
	import FormLabel from '$lib/components/ui/form-label/FormLabel.svelte';

	import BulletList from '@tiptap/extension-bullet-list';
	import Document from '@tiptap/extension-document';
	import ListItem from '@tiptap/extension-list-item';
	import Text from '@tiptap/extension-text';
	import { type BlogData } from '$lib/ypaTypes.js';
	import { CustomImage, CustomHeading } from './customTiptapExtensions';
	import { updateBlogPost } from '$lib/api';

	const { data }: { data: BlogData } = $props();

	let element: HTMLDivElement;
	let editor: Editor | undefined = $state();
	let activeStates = $state({
		heading: { level: 0 },
		paragraph: false,
		bulletList: false,
		orderedList: false
	});

	let saveTimeout: ReturnType<typeof setTimeout>;

	// Editor styles grouped by element type
	const baseStyle = 'prose prose-slate min-h-[700px] outline-none';

	const headingStyles = [
		'prose-headings:font-display',
		'prose-h1:text-4xl prose-h1:font-bold',
		'prose-h2:text-3xl prose-h2:font-semibold',
		'prose-h3:text-2xl prose-h3:font-medium'
	].join(' ');

	const paragraphStyles = 'prose-p:text-gray-600 prose-p:leading-relaxed';

	const linkStyles = 'prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium';

	const emphasisStyles = 'prose-strong:text-gray-900 prose-strong:font-semibold';

	const listStyles = 'prose-ul:my-6 prose-ol:my-6 prose-li:my-2';

	const imageStyles = 'prose-img:shadow-md';

	const editorStyle = [
		baseStyle,
		headingStyles,
		paragraphStyles,
		linkStyles,
		emphasisStyles,
		listStyles,
		imageStyles
	].join(' ');

	let html = $state(data.html || '');
	let slug = $state(data.slug);
	let title = $state(data.title);
	let description = $state(data.description);
	let category = $state(data.category || 'blog');

	const handleSaveButton = async () => {
		console.log('click');
		await updateBlogPost(data.id.toString(), {
			title,
			slug,
			description,
			category: category as 'blog' | 'buyers_information' | 'directory'
		});
	};

	const debouncedHandleHTMLSave = () => {
		clearTimeout(saveTimeout);
		saveTimeout = setTimeout(async () => {
			try {
				await updateBlogPost(data.id.toString(), {
					html,
					title,
					slug,
					description,
					category: category as 'blog' | 'buyers_information' | 'directory'
				});
			} catch (error) {
				console.error('Error saving HTML:', error);
			}
		}, 1000);
	};

	const handleImageUpload = async (file: File, isCover = false) => {
		const formData = new FormData();
		formData.append('image', file);
		formData.append('id', data.id.toString());
		if (isCover) {
			formData.append('cover', 'true');
		}

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			const responseData = await response.json();
			return isCover ? true : responseData?.file?.url;
		} catch (error) {
			console.error('Image upload error:', error);
			throw error;
		}
	};

	const handlePaste = async (e: ClipboardEvent) => {
		const items = e.clipboardData?.items;
		if (!items) return;

		for (const item of items) {
			if (item.type.indexOf('image') === 0) {
				const file = item.getAsFile();
				if (file) {
					try {
						const imageUrl = await handleImageUpload(file);
						if (imageUrl) {
							editor?.chain().focus().setImage({ src: imageUrl }).run();
						}
					} catch (error) {
						console.error('Failed to upload pasted image:', error);
					}
				}
			}
		}
	};

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: editorStyle
				},
				handlePaste: (view, event) => {
					handlePaste(event);
					return false;
				}
			},
			element: element,
			extensions: [
				Document,
				CustomImage.configure({
					HTMLAttributes: {
						class: 'max-w-full h-auto'
					},
					allowBase64: true
				}),
				Dropcursor,
				Link.configure({
					openOnClick: false,
					autolink: true,
					defaultProtocol: 'https',
					protocols: ['https'],
					HTMLAttributes: {
						class: 'text-blue-800 underline'
					}
				}),
				OrderedList.configure({
					HTMLAttributes: {
						class: 'list-decimal pl-5'
					}
				}),
				BulletList.configure({
					HTMLAttributes: {
						class: 'list-disc pl-5'
					}
				}),
				ListItem.configure({
					HTMLAttributes: {
						class: ''
					}
				}),
				Paragraph.configure({
					HTMLAttributes: {
						class: 'text-sm text-gray-800'
					}
				}),
				CustomHeading.configure({
					levels: [1, 2, 3],
					HTMLAttributes: {
						class: 'font-bold mb-2'
					}
				}),
				Text
			],
			content: html,
			onTransaction: ({ editor: newEditor }) => {
				editor = newEditor;
				html = newEditor.getHTML();
				activeStates = {
					heading: {
						level: newEditor.isActive('heading', { level: 1 })
							? 1
							: newEditor.isActive('heading', { level: 2 })
								? 2
								: newEditor.isActive('heading', { level: 3 })
									? 3
									: 0
					},
					paragraph: newEditor.isActive('paragraph'),
					bulletList: newEditor.isActive('bulletList'),
					orderedList: newEditor.isActive('orderedList')
				};
				debouncedHandleHTMLSave();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
		clearTimeout(saveTimeout);
	});

	const toggleHeading = (level: 1 | 2 | 3) => {
		editor?.chain().focus().toggleHeading({ level: level }).run();
	};

	const isButtonActive = $derived((type: string, options?: Record<string, any>) => {
		if (type === 'heading' && options?.level) {
			return activeStates.heading.level === options.level;
		}
		return activeStates[type as keyof typeof activeStates] ?? false;
	});

	const getButtonClass = $derived((type: string, options?: Record<string, any>) => {
		const baseClass = 'px-3 py-1.5 rounded font-medium text-sm transition-colors';
		const isActive = isButtonActive(type, options);
		return `${baseClass} ${isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`;
	});
</script>

<div class="flex flex-col pt-8">
	<div class="flex items-center gap-4 pb-8 border-b border-gray-200">
		<div class="flex-1">
			<FormLabel textColor="text-black" label="Slug">
				<Input
					bind:value={slug}
					class="w-full bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
				/>
			</FormLabel>
		</div>
		<div class="flex-1">
			<FormLabel textColor="text-black" label="Title">
				<Input
					bind:value={title}
					class="w-full bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
				/>
			</FormLabel>
		</div>
		<Button
			onclick={() => handleSaveButton()}
			class="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors">Save</Button
		>
	</div>
	<div class="flex pb-8 gap-2">
		{#if editor}
			<button onclick={() => toggleHeading(1)} class={getButtonClass('heading', { level: 1 })}>
				H1
			</button>
			<button onclick={() => toggleHeading(2)} class={getButtonClass('heading', { level: 2 })}>
				H2
			</button>
			<button onclick={() => toggleHeading(3)} class={getButtonClass('heading', { level: 3 })}>
				H3
			</button>
			<button
				onclick={() => editor?.chain().focus().setParagraph().run()}
				class={getButtonClass('paragraph')}
			>
				P
			</button>
			<button
				onclick={() => editor?.chain().focus().toggleBulletList().run()}
				class={getButtonClass('bulletList')}
			>
				Toggle bullet list
			</button>
			<button
				onclick={() => editor?.chain().focus().toggleOrderedList().run()}
				class={getButtonClass('orderedList')}
			>
				Toggle ordered list
			</button>
			<button
				onclick={async () => {
					const input = document.createElement('input');
					input.type = 'file';
					input.accept = 'image/*';
					input.onchange = async (e) => {
						const file = (e.target as HTMLInputElement).files?.[0];
						if (file) {
							try {
								const imageUrl = await handleImageUpload(file);
								if (imageUrl) {
									editor?.chain().focus().setImage({ src: imageUrl }).run();
								}
							} catch (error) {
								console.error('Failed to upload image:', error);
							}
						}
					};
					input.click();
				}}
				class={getButtonClass('image')}
			>
				Add Image
			</button>
			<button
				onclick={async () => {
					const input = document.createElement('input');
					input.type = 'file';
					input.accept = 'image/*';
					input.onchange = async (e) => {
						const file = (e.target as HTMLInputElement).files?.[0];
						if (file) {
							try {
								await handleImageUpload(file, true);
							} catch (error) {
								console.error('Failed to upload cover image:', error);
							}
						}
					};
					input.click();
				}}
				class="px-3 py-1.5 rounded font-medium text-sm transition-colors text-gray-600 hover:bg-gray-100"
			>
				Set Cover Image
			</button>
		{/if}
	</div>

	<div class="border border-gray-200">
		<div class="px-8 py-6 w-[1000px]" bind:this={element}></div>
	</div>
</div>
