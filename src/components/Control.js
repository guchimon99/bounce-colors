import React from 'react';
import {connect} from 'react-redux';

import emojis from '../constants/emojis';

import Emoji from './Emoji';
import actionCreator from '../actions';

const Button = ({emoji, isCurrent, onClick}) => {
  return (
    <button className="relative focus:outline-none" onClick={onClick}>
      <div className={`absolute inset-0 rounded-full ${isCurrent ? 'bg-blue-500' : 'bg-white'} opacity-50`} />
      <div className="relative pl-5 py-1 pr-4 text-xl">
        <Emoji emoji={emoji} />
      </div>
    </button>
  )
}


function Component({current, setCurrent, addEmoji}) {
  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="flex p-4 overflow-auto">
        {emojis.map((emoji, index) =>
          <div className="mr-4 flex-shirk-0" key={index}>
            <Button onClick={() => setCurrent(emoji)} emoji={emoji} isCurrent={current.code === emoji.code} />
          </div>
        )}
      </div>
      <div className="flex-grow" onClick={addEmoji} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  current: state.config.current,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrent: (emoji) => dispatch(actionCreator.config.setCurrent(emoji)),
  addEmoji: () => dispatch(actionCreator.world.add()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);