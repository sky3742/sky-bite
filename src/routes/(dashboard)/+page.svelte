<script lang="ts">
	import { AnalyticCard } from '$lib/components/common';
</script>

<div class="grid gap-6">
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		<AnalyticCard label="New Orders" value={23} />
		<AnalyticCard label="In-Progress Orders" value={12} />
		<AnalyticCard label="Completed Orders" value={34} />
	</div>
</div>
