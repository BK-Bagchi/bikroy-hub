import { Table, Button } from "react-bootstrap";

const Posts = () => {
  // Dummy data
  const posts = [
    { id: 1, title: "First Post", author: "Alice", status: "Published" },
    { id: 2, title: "Second Post", author: "Bob", status: "Draft" },
    { id: 3, title: "Third Post", author: "Charlie", status: "Pending" },
  ];

  return (
    <div>
      <h2 className="mb-4">📑 Manage Posts</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.status}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Posts;
