import React from 'react'

function LoadingTransition() {
  return (
    <div id="preloader">
		<div id="ctn-preloader" className="ctn-preloader">
			<div className="animation-preloader">
				<div className="icon">
					<img src="/assets/ico_logo.png" alt="" className="m-auto d-block" /></div>
					<div className="txt-loading mt-3">
					<span data-text-preloader="G" className="letters-loading">
						G
					</span>
					<span data-text-preloader="R" className="letters-loading">
						R
					</span>
					<span data-text-preloader="A" className="letters-loading">
						A
					</span>
					<span data-text-preloader="N" className="letters-loading">
						N
					</span>
					<span data-text-preloader="U" className="letters-loading">
						U
					</span>
					<span data-text-preloader="L" className="letters-loading">
						L
					</span>
					<span data-text-preloader="A" className="letters-loading">
						A
					</span>
					<span data-text-preloader="R" className="letters-loading">
						R
					</span>
				</div>
			</div>	
		</div>	
	</div>
  )
}

export default LoadingTransition