
export default {
  name: 'filter',
  /**
   * [status description]
   * @param  {[type]} status [description]
   * @return {[type]}        [description]
   */
  status(status) {
    let statusText = ''
    switch (status) {
      case 0:
        statusText = '正常';
        break;
      case -1:
        statusText = '删除';
        break;
      default:
        statusText = '未知';
        break;
    }
    return statusText;
  }
}
