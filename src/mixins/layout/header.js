export default {
  data () {
    let userName = this.$cookie.get('username')
    return {
      subMenus: [
        {
          className: 'user-info',
          text: `Hi, ${userName}`,
          options: [
            {text: '退出登录', command: 'logout'}
          ]
        }, {
          className: 'user-help',
          text: '帮助',
          options: [
            {text: '新手引导', command: 'main'},
            {text: '意见反馈', command: 'feedback'},
            {text: '客服1：4232323232'},
            {text: '客服1：400-888-9999'},
            {text: '服务时间：9:00-21:00'}
          ]
        }
      ],
      logoImg: require('@/assets/images/logo_img.png'),
      avatarImg: require('@/assets/images/avatar_icon.png'),
      // 意见反馈弹窗
      visible: false,
      options: {
        title: '意见反馈',
        width: '560px',
        footOpts: [{
          label: '取消',
          clickFn: () => {
            this.visible = false
          }
        }, {
          label: '确定',
          type: 'primary',
          clickFn: () => {
            this.visible = false
          }
        }]
      },
      formOpts: {
        labelWidth: '0'
      },
      form: {
        textarea: ''
      },
      formOptions: {
        textarea: {
          type: 'textarea',
          label: '',
          rows: 10,
          resize: 'none'
        }
      }
    }
  }
}
