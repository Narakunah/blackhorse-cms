<template>
    <div class="page">
        <div class="goods-list">
            <div class="mui-card" v-for="(v, i) in cartsList" :key="i">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="v.isChecked"></mt-switch>
                        <img :src="v.thumb_path" class="thumb_img">
                        <div class="info">
                            <h4>{{v.title}}</h4>
                            <div class="box">
                                <span class="price">￥{{v.sell_price}}</span>
                                <numbox :min="0" :max="Infinity" :step="1" v-model="v.count"></numbox>
                                <a href="#">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="amount">
                        <p>总计（不含运费）</p>
                        <p>
                            已勾选商品
                            <span class="red">{{totalCount}}</span> 件 总价：
                            <span class="red">￥{{totalPrice}}</span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import numbox from "../common/numberbox";
import axios from "axios"
export default {
    data(){
        return {
            cartsList: []
        }
    },
  components: {
    numbox
  },
  created(){
    axios({
        url:"http://www.escook.cn:3000/api/goods/getshopcarlist/" + this.$store.getters.getIds
    }).then(res => {
        if(res.data.status == 0){           
            res.data.message.forEach(v => {
                v.count = this.$store.getters.getCountById(v.id);
                v.isChecked = false;
            })
            console.log(res.data.message)
            this.cartsList = res.data.message;
        }
    })
  },
  watch: {
      cartsList: {
          handler(){
            this.$store.commit("updateCarts", this.cartsList);
          },
          deep: true
      }
  },
  computed: {
      totalCount(){
          var sum = 0;
          this.cartsList.forEach(v => {
              if(v.isChecked){
                  sum += v.count
              }
          })
          return sum;
      },
      totalPrice(){
          var sum = 0;
          this.cartsList.forEach(v => {
              if(v.isChecked){
                  sum += v.count * v.sell_price
              }
          })
          return sum;
      }
  }
};
</script>
<style scoped>
.goods-list .mui-card-content-inner .thumb_img {
  width: 60px;
  height: 60px;
}
.goods-list .mui-card-content-inner .info {
  flex: 1;
}
.goods-list .mui-card-content-inner .info h4 {
  font-size: 14px;
}
.goods-list .mui-card-content-inner .info .box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.goods-list .mui-card-content-inner .info .box .price {
  font-size: 16px;
  color: red;
}
.goods-list .mui-card-content-inner {
  display: flex;
}
.mui-card-content-inner .amount {
    flex: 1;
}
.mui-card-content-inner .red {
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.mui-card-content-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>