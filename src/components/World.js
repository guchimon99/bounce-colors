import React from 'react';
import {connect} from 'react-redux';

import actionCreator from '../actions';
import Emoji from './Emoji';

function Component({initWorld, emojiMap}) {

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    if(isMounted) {
      return;
    }
    initWorld();
    setIsMounted(true);
  }, [initWorld, isMounted]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center">
      {emojiMap.map((row, index) =>
        <div className="flex flex-shrink-0" key={index}>
          {row.map((emoji, index) =>
            <div key={index} className="w-4 h-4 text-xs flex justify-center items-center flex-shrink-0">
              <Emoji emoji={emoji} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  emojiMap: state.emojiMap,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initWorld: () => dispatch(actionCreator.world.init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);