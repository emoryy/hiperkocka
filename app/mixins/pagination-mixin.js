export default Em.Mixin.create({
  itemsPerPage: function() {
    var n = parseInt(localStorage.itemsPerPage, 10);
    return n ? n : 10;
  }.property(),

  itemsPerPageDidChange: function() {
    localStorage.itemsPerPage = parseInt(this.get('itemsPerPage'), 10);
    this.set('pendingPage', 1);
  }.observes('itemsPerPage'),

  itemsPerPageOptions: function() {
    return [5, 10, 15].map(function(i) {
      return {label: '%@ db / oldal'.fmt(i), value: i};
    });
  }.property(),

  limit: Em.computed.alias('itemsPerPage'),
  currentPage: 1,
  pendingPage: 1,

  currentMinusPage: function() {
    return this.get('currentPage') - 1;
  }.property('currentPage'),

  currentMinusMinusPage: function() {
    return this.get('currentPage') - 2;
  }.property('currentPage'),

  currentPlusPage: function() {
    return this.get('currentPage') + 1;
  }.property('currentPage'),

  currentPlusPlusPage: function() {
    return this.get('currentPage') + 2;
  }.property('currentPage'),

  total: Em.computed.alias('model.meta.total'),

  offset: function() {
    var pendingPage = this.get('pendingPage');
    var itemsPerPage = this.get('itemsPerPage');
    return (pendingPage - 1) * itemsPerPage;
  }.property('pendingPage', 'itemsPerPage'),

  currentOffset: function() {
    var currentPage = this.get('currentPage');
    var itemsPerPage = this.get('itemsPerPage');
    return (currentPage - 1) * itemsPerPage;
  }.property('currentPage', 'itemsPerPage'),

  fromItem: function() {
    return this.get('currentOffset') + 1;
  }.property('currentOffset'),

  toItem: function() {
    return this.get('currentOffset') + this.get('model.length');
  }.property('currentOffset', 'model.length'),

  totalPages: function() {
    return Math.ceil((this.get('total') / this.get('itemsPerPage')) || 1);
  }.property('total'),

  hasNoNextPage: function() {
    var currentPage = this.get('currentPage');
    var totalPages = this.get('totalPages');
    return currentPage === totalPages;
  }.property('currentPage', 'totalPages'),

  nextPageClass: function() {
    return this.get('currentPage') === this.get('totalPages') ? "unvisible" : "";
  }.property('currentPage', 'totalPages'),

  next2PagesClass: function() {
    return (this.get('totalPages') - this.get('currentPage') > 1) ? "" : "unvisible";
  }.property('currentPage', 'totalPages'),

  next3PagesClass: function() {
    return (this.get('totalPages') - this.get('currentPage') > 2) ? "" : "unvisible";
  }.property('currentPage', 'totalPages'),

  hasNoPrevPage: Em.computed.equal('currentPage', 1),

  prevPageClass: function() {
    return this.get('currentPage') === 1 ? "unvisible" : "";
  }.property('currentPage', 'totalPages'),

  prev2PagesClass: function() {
    return this.get('currentPage') < 3 ? "unvisible" : "";
  }.property('currentPage', 'totalPages'),

  prev3PagesClass: function() {
    return this.get('currentPage') < 4 ? "unvisible" : "";
  }.property('currentPage', 'totalPages'),

  pages: function(){
    var totalPages = this.get('totalPages');
    var currentPage = this.get('currentPage');
    var pagez = [];
    for (var i = 0; i < totalPages; i++) {
        pagez[i] = {
          pageNum: (i + 1),
          isCurrentPage: (i + 1) === currentPage
        };
    }
    return pagez;
  }.property('totalPages', 'currentPage'),

  pageDidChange: function() {
    Em.run.once(this, function() {
      var _this = this;
      this.fetch().then(function() {
        _this.set('currentPage', _this.get('pendingPage'));
      });
    });
  }.observes('pendingPage', 'itemsPerPage'),

  actions: {
    nextPage: function() {
      this.incrementProperty('pendingPage');
    },

    prevPage: function() {
      this.decrementProperty('pendingPage');
    },

    gotoPage: function(n) {
      this.set('pendingPage', n);
    }
  }
});
