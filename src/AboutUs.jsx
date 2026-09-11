import './AboutUs.css'

/** Company description shown on the landing page. */
function AboutUs() {
  return (
    <section className="about-us" aria-labelledby="about-us-title">
      <h2 id="about-us-title" className="about-us__title">About Us</h2>
      <p className="about-us__text">
        Welcome to Paradise Nursery, where green meets serenity! At Paradise
        Nursery, we are passionate about bringing nature closer to you. Our
        mission is to provide a wide range of high-quality plants that not only
        enhance the beauty of your surroundings but also contribute to a
        healthier and more sustainable lifestyle.
      </p>
      <p className="about-us__text">
        From air-purifying plants to aromatic fragrant ones, we have something
        for every plant enthusiast. Our team of experts is dedicated to ensuring
        that each plant meets our strict standards of quality and care. Whether
        you are a seasoned gardener or just starting your green journey, we are
        here to support you every step of the way.
      </p>
      <p className="about-us__text">
        Join us in our mission to create a greener, healthier world. Visit
        Paradise Nursery today and experience the beauty of nature right at your
        doorstep.
      </p>
    </section>
  )
}

export default AboutUs
