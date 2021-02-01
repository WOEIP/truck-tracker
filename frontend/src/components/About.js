import React, { Component } from 'react';
import Menu from './../components/Menu.js';
import '../styles/common.scss';
import '../styles/about.scss';
import aerial from '../img/info_aerial.jpg';
import truck from '../img/info_truck.jpg';

class About extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <article id="about-text">
        <Menu current="about"/>
        <h1 className="title">About Truck Tracker</h1>
        <span className="image main"><img src={aerial} alt="" /></span>
        <p>West Oakland is surrounded by three major freeways, sits next to the Port of Oakland, and is home to a major U.S. Postal Service Distribution Center. This brings a <i>lot</i> of trucks into the neighborhood day in and day out. These trucks expose our neighborhood to high concentrations of diesel particulate matter—almost three times higher than the Bay Area average. Trucks remain the single highest source of diesel emissions here. <b>Truck Tracker enables West Oakland residents to monitor truck traffic, so we can better understand trucking patterns’ impact on our community, hold violators accountable, and advocate for better air.</b></p>
        <span className="image main"><img src={truck} alt="" /></span>
        <p>The Truck tracker tool is a project of the <a href="https://woeip.org/">West Oakland Environmental Indicators Project</a>. WOEIP is a resident led, community-based environmental justice organization dedicated to achieving healthy homes, healthy jobs, and healthy neighborhoods for all who live, work, learn, and play in West Oakland, California. Built by <a href="https://github.com/motching">Attila Motching</a> with support from <a href="https://openoakland.org">OpenOakland</a> volunteers, we hope to continue expanding the tool so it can be adopted by other communities. We welcome <a href"#contributing">contributions</a> of all kinds.</p>


        <h2>The impact of diesel trucks on the community</h2>
        <p>Many of the commercial trucks that operate in West Oakland rely on diesel engines that produce soot (“particulate matter”) when operating. This particulate matter includes hundreds of chemical elements, including sulfates, ammonium, nitrates, elemental carbon, condensed organic compounds, and even carcinogenic compounds and heavy metals such as arsenic, selenium, cadmium and zinc. These particulates can’t really be seen, but they can be breathed in by the people living and working in the neighborhood. Ultrafine particulates, which are small enough to penetrate the cells of the lungs, make up 80-95% of diesel soot pollution.</p>

        <p>Diesel exhaust has been classified a potential human carcinogen by the U.S. Environmental Protection Agency (EPA) and the International Agency for Research on Cancer. Exposure to high levels of diesel exhaust has been shown to cause lung tumors in rats, and studies of humans routinely exposed to diesel fumes indicate a greater risk of lung cancer. For example, occupational health studies of railroad, dock, trucking, and bus garage workers exposed to high levels of diesel exhaust over many years consistently demonstrate a 20 to 50 percent increase in the risk of lung cancer or mortality.</p>

        <h2>Get involved</h2>
        <p>There are plenty of ways you can help West Oakland advocate for cleaner air:
        <ul><li>Create a free Truck Tracker account and <a href="#report">report illegal truck activity</a> when you see it.</li>
        <li>Learn about <a href="https://woeip.org/featured-work/owning-our-air/">Owning Our Air</a>, WOIEP's initiative to hold the City and County accountable for reducing toxic air exposure in West Oakland.</li>
        <li>Contribute your coding, research, or other skills to the work we're doing. Just <a href="#contact">send us a note</a> to let us know what you're most interested in.</li></ul></p>

      </article>
    );
  }
}

export default About;
