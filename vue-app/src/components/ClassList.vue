<template>
  <div>
    <van-sticky>
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        style="marin:8px"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </van-sticky>
    <van-tabs v-model="activeList" sticky :change="onChange" swipeable>
      <van-tab title="我加入的" name="added">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="product-list-refresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            @offset="300"
          >
            <!-- <p v-for="item in list" :key="item">{{ item }}</p> -->
            <div v-for="(item, index) in addedclasslist" :key="index">
              <van-card
                class="class-info"
                :price="item.students"
                :desc="item.teacher"
                :title="item.classname"
                thumb="https://static-cdn-oss.mosoteach.cn/mssvc/icons/icon_cc_cover1_9@2x.png"
                :click-thumb="classDetail(item)"
                currency="学生人数:"
              >
                <template #tags>
                  <van-tag round plain type="danger" v-for="(tag, idx) in item.tags" :key="idx">{{tag}}</van-tag>
                </template>
                <template #footer>
                  <van-button @click="onClock" size="mini">签到</van-button>
                  <van-button @click="onHandsUp" size="mini">举手</van-button>
                </template>
              </van-card>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="我创建的" name="created">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="product-list-refresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            @offset="300"
          >
            <!-- <p v-for="item in list" :key="item">{{ item }}</p> -->
            <div class="class-item" v-for="(item, index) in createdclasslist" :key="index" @click="classDetail(item)">
              <van-card
                class="class-info"
                :price="item.students"
                :desc="item.teacher"
                :title="item.classname"
                thumb="https://static-cdn-oss.mosoteach.cn/mssvc/icons/icon_cc_cover1_9@2x.png"
                :click-thumb="classDetail(item)"
                currency="学生人数:"
              >
                <template #tags>
                  <van-tag plain type="primary" v-for="(tag, idx) in item.tags" :key="idx">{{tag}}</van-tag>
                </template>
                <template #footer>
                  <van-button @click="onClock" size="mini">签到</van-button>
                  <van-button @click="onHandsUp" size="mini">举手</van-button>
                </template>
              </van-card>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'ClassList',
  data () {
    return {
      value: '',
      activeList: 'added',
      loading: false,
      finished: false,
      refreshing: false,
      addedclasslist: [],
      createdclasslist: []
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        if (this.refreshing) {
          this.addedclasslist = []
          this.refreshing = false
        }

        for (let i = 0; i < 8; i++) {
          if (this.activeList === 'added') {
            this.addedclasslist.push(
              {
                classid: 2,
                classname: '鸡 你 太 美',
                classimg: 'https://img.yzcdn.cn/vant/cat.jpeg',
                teacher: '蔡虚坤',
                students: 99,
                tags: [
                  '唱',
                  '跳',
                  'Rap',
                  '篮球'
                ]
              }
            )
          } else {
            this.addedclasslist.push(
              {
                classid: 2,
                classname: '唱跳Rap篮球',
                classimg: 'https://img.yzcdn.cn/vant/cat.jpeg',
                teacher: '蔡虚坤',
                students: 99
              }
            )
          }
        }
        this.loading = false
        if (this.addedclasslist.length >= 2) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    refresh: function () {
      this.onLoad()
    },
    classDetail: function (item) {
      console.log('进入')
    },
    onSearch: function () {
    },
    onChange: function () {
      this.onLoad()
    },
    onClock: function () {
      console.log('签到')
    },
    onHandsUp: function () {
      console.log('举手')
    }
  }
}
</script>

<style scoped>
.class-item {
  height: 120px;
  background: #5190EF;
  margin: 8px;
}
.left-img {
  width: 100px;
  height: 100px;
  float: left;
  magin: 10px;
}
.class-info {
  margin-top: 8px;
}
</style>
