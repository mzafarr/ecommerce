
export default function Home() {
  return (
    <>
      <section className="bg-cover  main-laptops h-screen bg-[url('/img/10.jpg')]">
        <div className="main-text-phones pl-8">
          <h6>Laptops</h6>
          <p>A laptop is not just a device!</p>

          <a href="#" className="main-btn-phones">
            Shop Now<i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>
      </section>

      <section className="bg-cover bg-center main-phones relative h-screen bg-[url('/img/4.jpg')] bg-opacity-50">
        <div className="main-text-phones">
          <h6 >Phones</h6>
          <p>A phone is not just a device!</p>

          <a href="#" className="main-btn-phones">
            Shop Now<i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>
      </section>


    </>
  );
}
