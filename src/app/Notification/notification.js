export const sendNotification = async (userEmail,ownerImage, message,time) => {
    // console.log(userEmail,ownerImage, message,time)
    try {
        const newNotification = {
            userEmail:userEmail,
            ownerImage:ownerImage,
            message:message,
            isRead: false,
            createdAt: time,
            updatedAt: time
        }
      // Make an API request to your server to store the notification
      const response = await fetch("http://localhost:3000/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotification),
      });
  
      if (response.ok) {
        console.log("Notification sent successfully");
      } else {
        console.error("Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };
  