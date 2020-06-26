import React, { Component } from 'react'
import SvgComponent from '../../components/SvgComponents/LoaderSvg'
import SvgFile from './SvgFile'

class Loader extends Component {
   render() {
      return <SvgComponent renderComponent={SvgFile} {...this.props} />
   }
}

export default Loader
