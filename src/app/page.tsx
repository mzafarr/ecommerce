export default function Home() {
  return (
    <>
      <section className="bg-cover bg-center main-laptops bg-[url('/img/lap.jpg')] bg-opacity-50">
        <div className="main-text-laptops">
          <h6>Laptops</h6>
          <p>A laptop is not just a device!</p>

          <a href="#" className="main-btn-laptops">
            Shop Now<i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>
      </section>

      <section className="bg-cover bg-center main-phones relative h-screen bg-[url('/img/ph.jpg')] bg-opacity-50">
        <div className="main-text-laptops">
          <h6 className="text-black">Phones</h6>
          <p>A phone is not just a device!</p>

          <a href="#" className="main-btn-laptops">
            Shop Now<i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>
      </section>

      <section className="contact">
        <div className="contact-info">
          <div className="first-info">
            {/* <img src="logo.jpg" alt="" /> */}
            <h3>Logo</h3>
            <p>
              Lahore Grammar School Senior Boys Campus, <br /> Johar Town Lahore
              Pakistan 54000
            </p>
            <p>0304-1122911</p>
            <p>developwithtaab@gmail.com</p>

            <div className="social-icon">
              <a href="#">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="https://www.instagram.com/taab._.10/">
                <i className="bx bxl-instagram"></i>
              </a>
            </div>
          </div>

          <div className="second-info">
            <h4>Support</h4>
            <p>Contact us</p>
            <p>About page</p>
            <p>Shopping & Resturns</p>
            <p>Privacy</p>
          </div>

          <div className="third-info">
            <h4>Shop</h4>
            <p>Phones</p>
            <p>Laptops</p>
            <p>Accesories</p>
          </div>

          <div className="fourth-info">
            <h4>Company</h4>
            <p>About</p>
            <p>Blog</p>
            <p>Login</p>
          </div>

          <div className="five">
            <h4>Subscribe</h4>
            <p>
              Receive Updates, Hot Deals, Discounts Sent Straight In Your Inbox
              Daily
            </p>
          </div>
        </div>
      </section>

      <div className="end-text">
        <p>Homepage designed by Taab :0</p>
      </div>
    </>
  );
}
