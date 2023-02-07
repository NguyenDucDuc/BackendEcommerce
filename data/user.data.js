const users = [
    {
      id: 1,
      userName: "nguyenducduc",
      passWord: "$2b$10$dItg8LdZp68eRMc0TNg.3uaYlQxt4846tKshaoLBD1oiOd8NBwN8O",
      firstName: "Nguyen",
      lastName: "Duc Duc",
      phone: "0356879921",
      email: "nguyenducduc26797@gmail.com",
      avatar: "https://res.cloudinary.com/djbju13al/image/upload/v1675700522/Avatar/1675700519338.jpg",
      birthDay: "2001-02-07 03:40:00",
      status: true,
      isActive: true,
      lastVisited: Date.now()
    },
    {
      id: 2,
      userName: "trananhtuan",
      passWord: "$2b$10$dItg8LdZp68eRMc0TNg.3uaYlQxt4846tKshaoLBD1oiOd8NBwN8O",
      firstName: "Tran",
      lastName: "Anh Tuan",
      phone: "0356879921",
      email: "tuandz21@gmail.com",
      avatar: "https://res.cloudinary.com/djbju13al/image/upload/v1675700522/Avatar/1675700519338.jpg",
      birthDay: "2001-02-07 03:40:00",
      status: true,
      isActive: true,
      lastVisited: Date.now()
    },
    {
      id: 3,
      userName: "buithethanh",
      passWord: "$2b$10$dItg8LdZp68eRMc0TNg.3uaYlQxt4846tKshaoLBD1oiOd8NBwN8O",
      firstName: "Bui",
      lastName: "The Thanh",
      phone: "0356879921",
      email: "thethanh686@gmail.com",
      avatar: "https://res.cloudinary.com/djbju13al/image/upload/v1675700522/Avatar/1675700519338.jpg",
      birthDay: "2002-02-07 03:40:00",
      status: true,
      isActive: true,
      lastVisited: Date.now()
    },
    {
      id: 4,
      userName: "nguyenngocdiep",
      passWord: "$2b$10$dItg8LdZp68eRMc0TNg.3uaYlQxt4846tKshaoLBD1oiOd8NBwN8O",
      firstName: "Nguyen",
      lastName: "Ngoc Diep",
      phone: "0356879921",
      email: "nndiep26797@gmail.com",
      avatar: "https://res.cloudinary.com/djbju13al/image/upload/v1675700522/Avatar/1675700519338.jpg",
      birthDay: "2004-02-07 03:40:00",
      status: true,
      isActive: true,
      lastVisited: Date.now()
    },
    {
      id: 5,
      userName: "nguyenvanduc",
      passWord: "$2b$10$dItg8LdZp68eRMc0TNg.3uaYlQxt4846tKshaoLBD1oiOd8NBwN8O",
      firstName: "Nguyen",
      lastName: "Van Duc",
      phone: "0356879921",
      email: "nguyenducduc26797@gmail.com",
      avatar: "https://res.cloudinary.com/djbju13al/image/upload/v1675700522/Avatar/1675700519338.jpg",
      birthDay: "2001-02-07 03:40:00",
      status: true,
      isActive: true,
      lastVisited: Date.now()
    }
  ]
//// ADDRESS
  const address = [
    {
      id: 1,
      city: "Da Lat",
      district: "Quan 2",
      ward: "Phuong 1",
      street: "Nguyen Cong Tru",
      detail: "241",
      userId: 1
    },
    {
      id: 2,
      city: "Da Lat",
      district: "Quan 1",
      ward: "Phuong 1",
      street: "Bui Thi Xuan",
      detail: "241",
      userId: 2
    },
    {
      id: 3,
      city: "Ho Chi Minh",
      district: "Quan 10",
      ward: "Phuong 10",
      street: "Su Van Hanh",
      detail: "320",
      userId: 3
    },
    {
      id: 4,
      city: "Ho Chi Minh",
      district: "Quan 12",
      ward: "Phuong 1",
      street: "Dong Hung Thuan 13",
      detail: "241",
      userId: 4
    },
    {
      id:5,
      city: "Da Lat",
      district: "Quan 8",
      ward: "Phuong 1",
      street: "Hai Ba Trung",
      detail: "68",
      userId: 5
    }
  ]

  /// CART
  const cart = [
    {
      id: 1,
      userId: 1,
    },
    {
      id: 2,
      userId: 2,
    },
    {
      id: 3,
      userId: 3,
    },
    {
      id: 4,
      userId: 4,
    },
    {
      id: 5,
      userId: 5,
    }
  ]

  /// CUSTOMER
  const customers = [
    {
      id: 1,
      point: 0,
      userId: 1
    },
    {
      id: 2,
      point: 0,
      userId: 2
    },
    {
      id: 3,
      point: 0,
      userId: 3
    },
    {
      id: 4,
      point: 0,
      userId: 4
    },
    {
      id: 5,
      point: 0,
      userId: 5
    }
  ]
  
module.exports = {users, address, cart, customers}  