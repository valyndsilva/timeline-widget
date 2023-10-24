import Timeline from "./components/Timeline";

// Get events from MongoDB
// const getEvents = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/events", {
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }
//   } catch (error) {
//     console.log("Error loading events:", error);
//   }
// };

export default async function Home() {
  // const  events  = await getEvents();
  // console.log(events);
  return (
    <main className="flex flex-col w-full items-center justify-center mx-auto">
      <Timeline />
    </main>
  );
}
