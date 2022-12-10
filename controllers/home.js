const { getAllCars } = require("../services/cars");

module.exports = {
  async home(req, res) {
    const query = Object.entries(req.query).reduce((obj, value) => {
      return {
        ...obj,
        [value[0]]: value[1],
      };
    }, {});

    console.log(query);

    const page = Number(req.query.page) || 1;

    const { cars, pagesTotal } = await getAllCars(req.query, page);

    const pages = [{ page, selected: true }];

    if (page != 1) {
      pages.unshift({ page: page - 1 });
    }

    if (page + 1 <= pagesTotal) {
      pages.push({ page: page + 1 });
    }
    if (page + 2 <= pagesTotal && pages.length < 3) {
      pages.push({ page: page + 2 });
    }

    let showFirstPage = (page != 3 && page - 1 > 1) || page == 3;

    let showLastPage =
      (page == 1 && page + 2 < pagesTotal) ||
      (page != 1 && page + 1 < pagesTotal);

    res.render("home", {
      cars,
      query: req.query,
      pages,
      query,
      showFirstPage,
      showLastPage,
      pagesTotal,
    });
  },
};
