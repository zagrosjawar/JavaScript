const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const output = document.getElementById('output');

// Fetch and display posts
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        displayPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    // Create a new post
    async function createPost() {
      const title = document.getElementById('title').value;
      const body = document.getElementById('body').value;

      const newPost = {
        title: title,
        body: body,
        userId: 1,
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        });
        const post = await response.json();
        console.log('Created Post:', post);
        alert('Post Created');
        document.getElementById('postForm').reset();
        fetchPosts(); // Refresh posts
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }

    // Update an existing post
    async function updatePost() {
      const updatedPost = {
        id: 1,
        title: 'Updated Post',
        body: 'This is the updated content of the post.',
        userId: 1,
      };

      try {
        const response = await fetch(`${API_URL}/1`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPost),
        });
        const post = await response.json();
        console.log('Updated Post:', post);
        alert('Post Updated');
        fetchPosts(); // Refresh posts
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }

    // Delete an existing post
    async function deletePost() {
      try {
        const response = await fetch(`${API_URL}/1`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Post Deleted');
          alert('Post Deleted');
          fetchPosts(); // Refresh posts
        } else {
          throw new Error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }

    // Display posts in the DOM
    function displayPosts(posts) {
      output.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'card';
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        `;
        output.appendChild(postElement);
      });
    }
  
//End