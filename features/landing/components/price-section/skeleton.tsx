export default function PriceSectionSkeleton() {
	return (
		<section className="mx-auto w-full max-w-5xl px-4 py-12">
			<div className="flex justify-center gap-8">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						className="h-[400px] w-full animate-pulse rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
						key={i}
					>
						<div className="space-y-4 p-8">
							<div className="h-5 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
							<div className="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-700" />
							<div className="h-8 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
							<div className="mt-6 space-y-3">
								{Array.from({ length: 5 }).map((_, j) => (
									<div
										className="h-3 rounded bg-neutral-100 dark:bg-neutral-800"
										key={j}
										style={{ width: `${70 + Math.random() * 30}%` }}
									/>
								))}
							</div>
							<div className="mt-6 h-10 rounded bg-neutral-200 dark:bg-neutral-700" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
