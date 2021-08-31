// pages/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    i:0,
    img_url: [],
    content: '',
    clould_img_id_list: [],
    food_type:'',
    canteen:'',
    hot_type:0,
    apptest:[{}],
    maxContentLength: 1000,
    minContentLength: 5,
    items: [
      { name: 'vegetable', value: '素菜'},
      { name: 'meat', value: '荤菜' },
    ],
    items2: [
      { name: 'oneHall', value: '一食堂'},
      { name: 'twoHall', value: '二食堂' },
      { name: 'threeHall', value: '三食堂' },
    ],
    userStars: [
      '../../images/star2.png',
      '../../images/star2.png',
      '../../images/star2.png',
      '../../images/star2.png',
      '../../images/star2.png'
    ],
    message:[{
      food_type:'',
      canteen:'',
      content:'',
      hot_type:0,
      image:[]
    }],
    transition:[{}],
  },

  // 星星点击事件
  starTap: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = '../../images/star1.png'
      } else { // 其他是空心
        tempUserStars[i] = '../../images/star2.png'
      }

      this.data.hot_type = index;//当前点击的星星的序号即为好评度
    }
    // 重新赋值就可以显示了
    this.setData({
      userStars: tempUserStars
    })
  },

  cai: function (e) {
    switch (e.detail.value) {
      case "vegetable":
        this.data.food_type = '素菜';
        break;
      case "meat":
        this.data.food_type = '荤菜';
        break;
    }
  },
  shitang: function (e) {
    switch (e.detail.value) {
      case "oneHall":
        this.data.canteen = '一食堂';
        break;
      case "twoHall":
        this.data.canteen = '二食堂';
        break;
      case "threeHall":
        this.data.canteen = '三食堂';
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData)
  },
  input: function (e) {
    if (e.detail.value.length >= this.data.maxContentLength) {
      wx.showToast({
        title: '已达到最大字数限制',
      })
    }
    this.setData({
      content: e.detail.value
    })
  },

  chooseVegetable: function(){
    var choosevegetable = true;
  },

  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认1
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        if (res.tempFilePaths.length > 0) {
          //图如果满了1张，不显示加图
          if (res.tempFilePaths.length == 1) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }
          //把每次选择的图push进数组
          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            if (img_url.length >= 1) {
              wx.showToast({
                image: '../../images/warn.png',
                title: '图片过多'
              })
              that.setData({
                hideAdd: 1
              })
              break
            }
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })
        }
      }
    })
    console.log(this.data.img_url);
  },

  //发布按钮事件
  send: function (e) {
    var app = getApp(); 
    if (this.data.content.length < this.data.minContentLength) {
      wx.showToast({
        image: '../../images/warn.png',
        title: '内容太短!',
      })
      return
    }
    else {
      app.globalData.transition[this.data.i].food_type = this.data.food_type
      console.log(app.globalData.transition[this.data.i].food_type)
      app.globalData.transition[this.data.i].canteen = this.data.canteen
      app.globalData.transition[this.data.i].content = this.data.content
      app.globalData.transition[this.data.i].hot_type = this.data.hot_type
      app.globalData.transition[this.data.i].image = this.data.img_url
      console.log(app.globalData.transition)
      this.data.transition = getApp().globalData.transition[this.data.i]
      console.log(this.data.transition)
      if (this.data.food_type == '荤菜'){
        app.globalData.meat = [this.data.transition].concat(app.globalData.meat)
        console.log(app.globalData.meat)
      }
      else if (this.data.food_type == '素菜') {
        app.globalData.vegetable = [this.data.transition].concat(app.globalData.vegetable)
        console.log(app.globalData.vegetable)
      }
      if (this.data.canteen == '一食堂') {
        app.globalData.yi = [this.data.transition].concat(app.globalData.yi)
        console.log(app.globalData.yi)
      }
      else if (this.data.canteen == '二食堂') {
        app.globalData.er = [this.data.transition].concat(app.globalData.er)
        console.log(app.globalData.er)
      }
      else if (this.data.canteen == '三食堂') {
        app.globalData.san = [this.data.transition].concat(app.globalData.san)
        console.log(app.globalData.san)
      }
      wx.showToast({
        image: '../../images/dui.png',
        title: '发布成功'
      })
      this.data.i++
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  publishFail(info) {
    wx.showToast({
      image: '../../images/warn.png',
      title: info,
      mask: true,
      duration: 2500
    })
  }
})