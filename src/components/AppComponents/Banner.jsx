const Banner = () => {
  return (
    <>
      <div
        className="w-full h-[200px] md:h-[450px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${"https://i.ibb.co/89zw6CL/green-bg.jpg"}")`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="p-10 md:p-20 ">
          <div className="w-40 md:w-80 flex-">
            <h1 className="w-full text-3xl md:text-7xl font-bold  text-white/80">
              Share Your Opinions
            </h1>
            <hr className="w-full h-1 md:h-3 border-white bg-white/80" />
          </div>
          <p className="text-base md:text-3xl text-white/60 ">
            Take participate in surveys and <br /> share your honest opinion.
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
