import {observable,action} from 'mobx'

class StepFormStore{
  @observable current = 0
  @observable info = {}

  @action setCurrent(current){
    this.current = current
  }
  @action setInfo(info){
    this.info = info
  }
}

export default new StepFormStore()