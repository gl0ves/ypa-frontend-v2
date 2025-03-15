<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Paragraph from '@tiptap/extension-paragraph';
	import OrderedList from '@tiptap/extension-ordered-list';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import Dropcursor from '@tiptap/extension-dropcursor';
	import Heading from '@tiptap/extension-heading';
	import BulletList from '@tiptap/extension-bullet-list';
	import Document from '@tiptap/extension-document';
	import ListItem from '@tiptap/extension-list-item';
	import Text from '@tiptap/extension-text';
	import { type BlogData } from '$lib/ypaTypes.js';
	import { type NodeViewRenderer } from '@tiptap/core';

	import { upload, save } from '$lib/api';
	import Input from '../ui/input/input.svelte';

	const { data }: { data: BlogData } = $props();

	const CustomImage = Image.extend({
		addNodeView() {
			return ((props) => {
				const { node, getPos, editor } = props;
				const dom = document.createElement('img');

				// Set initial attributes
				Object.entries(props.node.attrs).forEach(([key, value]) => {
					dom.setAttribute(key, value as string);
				});

				// Handle local images (blob URLs or base64)
				if (
					node.attrs.src &&
					(node.attrs.src.startsWith('blob:') || node.attrs.src.startsWith('data:'))
				) {
					const url = upload(node.attrs.src);

					if (typeof getPos === 'function') {
						editor.commands.command(({ tr }) => {
							tr.setNodeMarkup(getPos(), undefined, {
								...node.attrs,
								src: url
							});
							return true;
						});
					}
				}

				return {
					dom,
					update: (updatedNode) => {
						Object.entries(updatedNode.attrs).forEach(([key, value]) => {
							dom.setAttribute(key, value as string);
						});
						return true;
					}
				};
			}) as NodeViewRenderer;
		}
	});

	const CustomHeading = Heading.extend({
		renderHTML({ node, HTMLAttributes }) {
			const hasLevel = this.options.levels.includes(node.attrs.level);
			const level = hasLevel ? node.attrs.level : this.options.levels[0];

			const levelClasses = {
				1: 'text-5xl text-gray-900',
				2: 'text-4xl text-gray-800',
				3: 'text-3xl text-gray-800'
			};

			const classes = `${this.options.HTMLAttributes.class || ''} ${levelClasses[node.attrs.level as 1 | 2 | 3] || ''}`;

			return [
				`h${level}`,
				{
					...HTMLAttributes,
					class: classes.trim()
				},
				0
			];
		}
	});

	let element: HTMLDivElement;
	let editor: Editor | undefined = $state();

	const editorStyle =
		'prose prose-slate max-w-none prose-headings:font-display prose-h1:text-4xl prose-h1:font-bold prose-h2:text-3xl prose-h2:font-semibold prose-h3:text-2xl prose-h3:font-medium prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-img:rounded-lg prose-img:shadow-md min-h-[700px]';

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: editorStyle
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
			content: data.content.blocks,
			onTransaction: ({ editor: newEditor }) => {
				// force re-render so editor.isActive works as expected
				editor = newEditor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	const toggleHeading = (level: 1 | 2 | 3) => {
		editor?.chain().focus().toggleHeading({ level: level }).run();
		console.log(editor?.isActive('heading', { level: level }));
	};

	const isButtonActive = $derived((type: string, options?: Record<string, any>) => {
		return editor?.isActive(type, options) ?? false;
	});

	const getButtonClass = $derived((type: string, options?: Record<string, any>) => {
		const baseClass = 'px-3 py-1.5 rounded font-medium text-sm transition-colors';
		const isActive = isButtonActive(type, options);
		console.log(isActive);
		return `${baseClass} ${isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`;
	});
</script>

<div class="flex max-w-[800px] mx-auto flex-col pt-8">
	<div class="pb-4">
		<Input placeholder="Title" value={data.title} />
	</div>
	<div class="pb-4">
		<Input placeholder="my-blog-slug" value={data.slug} />
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
				class={`px-3 py-1.5 rounded font-medium text-sm transition-colors ${
					editor.isActive('paragraph')
						? 'bg-gray-900 text-white'
						: 'text-gray-600 hover:bg-gray-100'
				}`}
			>
				P
			</button>
			<button
				onclick={() => editor?.chain().focus().toggleBulletList().run()}
				class={`px-3 py-1.5 rounded font-medium text-sm transition-colors ${
					editor.isActive('bulletList')
						? 'bg-gray-900 text-white'
						: 'text-gray-600 hover:bg-gray-100'
				}`}
			>
				Toggle bullet list
			</button>
			<button
				onclick={() => editor?.chain().focus().toggleOrderedList().run()}
				class={`px-3 py-1.5 rounded font-medium text-sm transition-colors ${
					editor.isActive('orderedList')
						? 'bg-gray-900 text-white'
						: 'text-gray-600 hover:bg-gray-100'
				}`}
			>
				Toggle ordered list
			</button>
			<button
				onclick={() => {
					const input = document.createElement('input');
					input.type = 'file';
					input.accept = 'image/*';
					input.onchange = (e) => {
						const file = (e.target as HTMLInputElement).files?.[0];
						if (file) {
							const url = URL.createObjectURL(file);
							editor?.chain().focus().setImage({ src: url }).run();
						}
					};
					input.click();
				}}
			>
				Add Image
			</button>
		{/if}
	</div>

	<div class="min-h-[700px]" bind:this={element}></div>
</div>
