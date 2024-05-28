import promotion1 from "../../../assets/promotion/promotion1.jpg"
import promotion2 from "../../../assets/promotion/promotion2.jpg"
import promotion3 from "../../../assets/promotion/promotion3.jpg"
export const nav = [
    {
      text: "Trang chủ",
      path: "/",
    },
    {
      text: "tìm kiếm",
      path: "/Search",
    },
    {
      text: "Hướng dẫn",
      path: "/services",
    },
    {
      text: "Liên hệ",
      path: "/blog",
    },
  ]
  export const featured = [
    {
      cover: promotion1,
      name: "Tặng 20k cho người giới thiệu khi Khách hàng mua vé lần đầu",
    },
    {
      cover: promotion2,
      name: "Khuyến mãi khủng",
    },
    {
      cover: promotion3,
      name: "Limousine VIP Các Khuyến mãi lớn",
    },
  ]
  export const awards = [
    {
      icon: <i class='fa-solid fa-trophy'></i>,
      num: "32 M	",
      name: "Blue Burmin Award",
    },
    {
      icon: <i class='fa-solid fa-briefcase'></i>,
      num: "43 M",
      name: "Mimo X11 Award",
    },
    {
      icon: <i class='fa-solid fa-lightbulb'></i>,
      num: "51 M",
      name: "Australian UGC Award",
    },
    {
      icon: <i class='fa-solid fa-heart'></i>,
      num: "42 M",
      name: "IITCA Green Award",
    },
  ]
  export const location = [
    {
      id: 1,
      name: "New Orleans, Louisiana",
      Villas: "12 Villas",
      Apartments: "10 Apartments",
      Offices: "07 Offices",
      cover: "./images/location/city-1.png",
    },
    {
      id: 2,
      name: "Jerrsy, United State",
      Villas: "12 Villas",
      Apartments: "10 Apartments",
      Offices: "07 Offices",
      cover: "./images/location/city-2.png",
    },
    {
      id: 3,
      name: "Liverpool, London",
      Villas: "12 Villas",
      Apartments: " 10 Apartments",
      Offices: "07 Offices",
      cover: "./images/location/city-3.png",
    },
    {
      id: 4,
      name: "NewYork, United States",
      Villas: "12 Villas",
      Apartments: " 10 Apartments",
      Offices: "07 Offices",
      cover: "./images/location/city-4.png",
    },
    {
      id: 5,
      name: "Montreal, Canada",
      Villas: "12 Villas",
      Apartments: " 10 Apartments",
      Offices: "07 Offices",
      cover: "./images/location/city-5.png",
    },
    {
      id: 6,
      name: "California, USA",
      Villas: "12 Villas",
      Apartments: " 10 Apartments",
      Offices: "07 Offices",
      cover: "./images/location/city-6.png",
    },
  ]
  export const team = [
    {
      list: "50",
      cover: "../images/customer/team-1.jpg",
      address: "Liverpool, Canada",
      name: "Sargam S. Singh",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "70",
      cover: "../images/customer/team-2.jpg",
      address: "Montreal, Canada",
      name: "Harijeet M. Siller",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "80",
      cover: "../images/customer/team-3.jpg",
      address: "Denever, USA",
      name: "Anna K. Young",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "51",
      cover: "../images/customer/team-4.jpg",
      address: "2272 Briarwood Drive",
      name: "Michael P. Grimaldo",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "42",
      cover: "../images/customer/team-5.jpg",
      address: "2272 Briarwood Drive",
      name: "Michael P. Grimaldo",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "38",
      cover: "../images/customer/team-5.jpg",
      address: "Montreal, USA",
      name: "Adam K. Jollio",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
  ]
  export const price = [
    {
      plan: "Basic",
      price: "29",
      ptext: "per user, per month",
      list: [
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "99.5% Uptime Guarantee",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "120GB CDN Bandwidth",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "5GB Cloud Storage",
        },
        { change: "color", icon: <i class='fa-solid fa-x'></i>, text: "Personal Help Support" },
        { change: "color", icon: <i class='fa-solid fa-x'></i>, text: "Enterprise SLA" },
      ],
    },
    {
      best: "Best Value",
      plan: "Standard",
      price: "49",
      ptext: "per user, per month",
      list: [
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "99.5% Uptime Guarantee",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "150GB CDN Bandwidth",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "10GB Cloud Storage",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "Personal Help Support",
        },
        {
          change: "color",
          icon: <i class='fa-solid fa-x'></i>,
          text: "Enterprise SLA",
        },
      ],
    },
    {
      plan: "Platinum",
      price: "79",
      ptext: "2 user, per month",
      list: [
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "100% Uptime Guarantee",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "200GB CDN Bandwidth",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "20GB Cloud Storage",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "Personal Help Support",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "Enterprise SLA",
        },
      ],
    },
  ]
  export const footer = [
    {
      title: "LAYOUTS",
      text: [{ list: "Home Page" }, { list: "About Page" }, { list: "Service Page" }, { list: "Property Page" }, { list: "Contact Page" }, { list: "Single Blog" }],
    },
    {
      title: "ALL SECTIONS",
      text: [{ list: "Headers" }, { list: "Features" }, { list: "Attractive" }, { list: "Testimonials" }, { list: "Videos" }, { list: "Footers" }],
    },
    {
      title: "COMPANY",
      text: [{ list: "About" }, { list: "Blog" }, { list: "Pricing" }, { list: "Affiliate" }, { list: "Login" }, { list: "Changelog" }],
    },
  ]
  