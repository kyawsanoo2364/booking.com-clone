import Search from "@/components/Search";

export default function Home() {
  return (
    <main className="bg-[#013B94]">
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-5xl text-white">Find your Next Stay</h2>
        <h3 className="text-white py-5 text-xl">
          Search low prices on hotels, homes and much more...
        </h3>
      </section>
      <section className="m-4 mt-0 -mb-14 px-2 lg:px-4">
        <Search />
      </section>
      <section className="mx-auto max-w-7xl mt-10 p-6 bg-white rounded-t-lg">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Trending Destinations</h3>
          <p className="font-light">
            Most popular choices for travellers from around the world
          </p>
        </div>
        <div className="flex space-x-4 py-5 overflow-x-scroll ">
          {/**data map */}
          {[...new Array(5)].map((_, i) => (
            <div className="space-y-1 shrink-0 cursor-pointer" key={i}>
              <img
                src="https://placehold.co/600x400"
                alt="Image"
                className="w-80 h-72 object-cover rounded-lg pb-2"
              />
              <p className="font-bold">title</p>
              <p>Location</p>
              <p className="font-light text-sm">Description</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
