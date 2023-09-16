import React from 'react'
import './Main.css';
function Main() { 
      return (
        <div>
          <div className="container">
       <div className='inner-section'>
       <div className='data-box'>
<p className='first-tag'>UPCOMING LAUNCH</p>
<h1 className='second-tag'>STARLINK MISSION</h1>
<button className='home-btn'>LEARN MORE</button>
</div>
       </div>
          </div>
    
          <div className="second-background">
          <div className='inner-section'>
       <div className='data-box'>
<p className='first-tag'>COMPLETED MISSION</p>
<h1 className='second-tag'>DRAGON AND CREW-6 RETURN TO EARTH</h1>
<button className='home-btn'>LEARN MORE</button>
</div>
       </div>
          </div>
    
          <div className="third-background">
          <div className='inner-section'>
       <div className='data-box'>
<h1 className='second-tag'>STARSHIP FLIGHT TEST</h1>
<button className='home-btn'>LEARN MORE</button>
</div>
       </div>
          </div>
        </div>

    
  )
}

export default Main