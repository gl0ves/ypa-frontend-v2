<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { Paragraph } from '@tiptap/extension-paragraph';
	import { Heading } from '@tiptap/extension-heading';
	import BulletList from '@tiptap/extension-bullet-list';
	import Document from '@tiptap/extension-document';
	import ListItem from '@tiptap/extension-list-item';
	import { Text } from '@tiptap/extension-text';

	// Create a custom heading extension that extends the base Heading
	const CustomHeading = Heading.extend({
		renderHTML({ node, HTMLAttributes }) {
			const hasLevel = this.options.levels.includes(node.attrs.level);
			const level = hasLevel ? node.attrs.level : this.options.levels[0];

			// Define classes for each heading level
			const levelClasses = {
				1: 'text-5xl text-gray-900',
				2: 'text-4xl text-gray-800',
				3: 'text-3xl text-gray-800'
			};

			// Combine base classes with level-specific classes
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
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Document,
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
			content: '<p>Hello World! 🌍️ </p>',
			onTransaction: () => {
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="flex max-w-[800px] mx-auto flex-col pt-8">
	<div class="flex pb-8 gap-2">
		{#if editor}
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class={editor.isActive('heading', { level: 1 }) ? 'bg-slate-300' : ''}
			>
				H1
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class={editor.isActive('heading', { level: 2 }) ? 'bg-slate-300' : ''}
			>
				H2
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class={editor.isActive('heading', { level: 3 }) ? 'bg-slate-300' : ''}
			>
				H3
			</button>
			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class={editor.isActive('paragraph') ? 'bg-slate-300' : ''}
			>
				P
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class={editor.isActive('bulletList') ? 'bg-slate-300' : ''}
			>
				Toggle bullet list
			</button>
		{/if}
	</div>

	<div bind:this={element}></div>
</div>
