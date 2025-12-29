const Banner = () => {
  return (
    <>
      <div
        className="relative w-full h-50 md:h-112.5 bg-cover bg-center bg-no-repeat flex items-center"
      // style={{
      //   backgroundImage: `url("${"https://i.ibb.co/89zw6CL/green-bg.jpg"}")`
      // }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://i.ibb.co/89zw6CL/green-bg.jpg")`,
          }}
        ></div>

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative container mx-auto p-5 flex flex-col items-end">
          <div className="w-40 md:w-80 lg:w-100 flex-col mb-5 md:mb-10  text-right">
            <h1 className="w-full text-3xl md:text-5xl lg:text-7xl font-bold text-white/80 mb-2">
              Share Your Opinions
            </h1>
            <hr className="w-full h-1 md:h-3 border-white bg-white/80" />
          </div>
          <p className="text-base md:text-2xl lg:text-3xl text-white/60 text-right">
            Take participate in surveys and <br /> share your honest opinion.
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
