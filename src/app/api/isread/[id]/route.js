import Notification from "@/models/notification/notificationModel";
import bdConnect from "@/utils/dbConnect";

export async function PUT(request, content) {
  const userEmail = content.params.id;
  console.log("fdiufhu", userEmail);
  
  await bdConnect();  

  try {
    // Mark notifications as read
    const result = await Notification.updateMany(
      {
        userEmail: userEmail,
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    if (result.ok) {
      request.respond({
        status: 200,
        body: { success: true },
      });
    } else {
      request.respond({
        status: 500,
        body: { error: "Failed to update notifications" },
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    request.respond({
      status: 500,
      body: { error: "Internal Server Error" },
    });
  }
}
