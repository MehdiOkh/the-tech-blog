async function commentFormHandler(event) {
	event.preventDefault();

	const comment_text = document
		.querySelector('textarea[name="comment-body"]')
		.value.trim();

	const post_id = window.location.toString().split("/")[
		window.location.toString().split("/").length - 1
	];

	// if there is a comment -- preventing from users submitting empty comments
	if (comment_text) {
		const response = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify({
				post_id,
				comment_text,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const purgePost = await fetch(
			"https://napi.arvancloud.ir/cdn/4.0/domains/ebnekhodadad.ir/caching/purge",
			{
				method: "POST",
				body: JSON.stringify({
					purge: "individual",
					purge_urls: [`https://www.ebnekhodadad.ir/post/${post_id}`],
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"apikey e0164ca6-006b-5d85-9dd3-3c2ced76256b",
				},
			}
		);
		console.log(await purgePost.json());
		console.log(purgePost.ok);

		if (response.ok && purgePost.ok) {
			document.location.reload();
		} else {
			alert(response.statusText);
		}
	}
}

document
	.querySelector(".comment-form")
	.addEventListener("submit", commentFormHandler);
