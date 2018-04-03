export default {
  data () {
    return {
      // 快速查询
      fastForm: {
        name: 'all',
        value: ''
      },
      fastOptions: {
        all: '快速查询',
        name: '名称',
        brand: '品牌',
        barcode: '条码',
        wholesaler: '供货商'
      },
      // 表格
      tableOptions: {
        entity_id: {
          label: 'ID',
          width: 120
        },
        name: {
          label: '名称',
          width: 200
        },
        brand: {
          label: '品牌',
          width: 200
        },
        barcode: {
          label: '条码',
          width: 300
        },
        wholesaler: {
          label: '供应商'
        },
        remark: {
          label: '附加说明'
        },
        gallery: {
          type: 'img',
          label: '图片',
          linkFn: rows => {
            return rows.gallery[0]
          },
          style: `{
            width: 48px;
            height: 48px;
            cursor: pointer;
          }`,
          clickFn: this.showGallery
        }
      },
      // 展示图片
      visible: false,
      gallerys: []
    }
  }
}
