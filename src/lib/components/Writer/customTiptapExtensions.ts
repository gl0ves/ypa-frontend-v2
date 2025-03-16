import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import { type NodeViewRenderer } from '@tiptap/core';
import { upload } from '$lib/api';

export const CustomImage = Image.extend({
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

export const CustomHeading = Heading.extend({
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
