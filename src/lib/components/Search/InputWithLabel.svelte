<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	export let label: string;
</script>

<div>
	<Label class="text-lg font-semibold capitalize text-white" for="input">{label}</Label>
	<div id="input"><slot /></div>
</div>
