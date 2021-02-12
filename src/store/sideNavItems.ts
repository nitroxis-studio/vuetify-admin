export interface ISideNavItem {
  path: string;
  title: string;
  icon?: string;
  order?: number;
  heading?: boolean;
}

export default [
  // {
  //   path: "/store",
  //   title: "Store",
  //   icon: "mdi-camera"
  // },
  {
    title: "Cities",
    heading: "true"
  },
  {
    path: "/cities",
    title: "View all Cities",
    icon: "mdi-city-variant"
  },
  {
    path: "/cities/add",
    title: "Add City",
    icon: "mdi-plus-circle"
  },
  // {
  //   title: "Products",
  //   heading: true
  // },
  // {
  //   path: "/products",
  //   title: "View All Products",
  //   icon: "mdi-cart"
  // },
  // {
  //   path: "/addProducts",
  //   title: "Add Products",
  //   icon: "mdi-cart-plus"
  // },
  // {
  //   title: "Categories",
  //   heading: true
  // },
  // {
  //   path: "/categories",
  //   title: "View All Categories",
  //   icon: "mdi-shape"
  // },
  // {
  //   path: "/categories/add",
  //   title: "Add Categories",
  //   icon: "mdi-plus-circle"
  // },
  {
    title: "Vendors",
    heading: true
  },
  {
    path: "/vendors",
    title: "View All Vendors",
    icon: "mdi-cart-plus"
  },
  {
    path: "/vendors/add",
    title: "Add Vendor",
    icon: "mdi-plus-circle"
  },
  {
    title: "Riders",
    heading: true
  },
  {
    path: "/riders",
    title: "View All Riders",
    icon: "mdi-motorbike"
  },
  {
    path: "/riders/add",
    title: "Add Riders",
    icon: "mdi-plus-circle"
  }

] as ISideNavItem[]
