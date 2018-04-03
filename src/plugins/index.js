// 引用第三方库
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'

import ajax from './network/ajax'
import get from './network/get'
import post from './network/post'

import msg from './toast/msg'
import tips from './toast/tips'
import success from './toast/success'
import error from './toast/error'

import status from './filter/status'

import load from './common/load'
import permission from './common/permission'
import encrypt from './common/encrypt'
import assign from './common/assign'
import format from './common/format'
import filter from './common/filter'
import show from './common/show'
import storage from './common/storage'

const plugins = [
  [ElementUI],
  [ajax, axios, qs],
  [get],
  [post],
  [msg],
  [tips],
  [success],
  [error],
  [status],
  [load],
  [permission],
  [encrypt],
  [assign],
  [format],
  [filter],
  [show],
  [storage]
]

export default plugins
