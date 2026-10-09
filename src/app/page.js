

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    
//     </div>
//   );
// }


import { Button } from "@heroui/react";

export default function Home() {
  return (<main className="min-h-screen bg-gray-50 p-6"> <h1 className="mb-4 text-3xl font-bold">
    🛒 বাজার দর </h1>

    <p className="mb-4">
      প্রতিদিনের বাজারের দাম জানুন।
    </p>

    <Button>সব পণ্য দেখুন</Button>
  </main>

);
}
