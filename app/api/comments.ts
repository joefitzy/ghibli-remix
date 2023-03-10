export type CommentEntry = {
  name: string;
  message: string;
  filmId: string;
};

export async function getComments(filmId: string) {
  const resp = await fetch(`http://localhost:3001/comments?filmId=${filmId}`);

  return resp.json();
}
export async function addComment(comment: CommentEntry) {
  const resp = await fetch("http://localhost:3001/comments", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: { "Content-Type": "application/json" },
  });

  return resp.json();
}
