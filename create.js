function setupCreateTodoHandler() {
  const form = document.getElementById("createTodoForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const completedValue = document.getElementById("completed").value.trim().toLowerCase();
    const completed = completedValue === "yes";

    if (!title || (completedValue !== "yes" && completedValue !== "no")) {
      alert("Please provide a valid title and completed status (Yes or No).");
      return;
    }

    try {
      const response = await fetch("http://192.168.88.27:8080/api/v2/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("user_id"),
          title,
          completed,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Todo created successfully!");
        document.getElementById("createModal").style.display = "none";
        window.location.reload();
      } else {
        alert(result.message || "Failed to create todo.");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Something went wrong while creating the todo.");
    }
  });
}
