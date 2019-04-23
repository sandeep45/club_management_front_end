import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

};

class Tos extends Component {
  constructor(props) {
    super(props);
  };
  
  componentWillMount(){
    console.log("Tos Container has mounted");
    this._init();
  };
  
  componentWillReceiveProps(nextProps){
  
  };
  
  static defaultProps = {
  
  };
  
  static propTypes = {
  };
  
  _init = () => {
    console.log("in init of Tos");
    document.title = `Terms of Use`;
  };
  
  render() {
    return (
      <div className={'container'}>
        <h1>TheTableTennisClub.com Terms of Use</h1>
  
        <h2>1. Terms</h2>
        By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law.
  
        <h2>2. Use License</h2>
        Permission is granted to temporarily download one copy of the materials (information or software) on TheTableTennisClub.com web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        modify or copy the materials;
        use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
        attempt to decompile or reverse engineer any software contained on TheTableTennisClub.com web site;
        remove any copyright or other proprietary notations from the materials; or
        transfer the materials to another person or "mirror" the materials on any other server.
        This license shall automatically terminate if you violate any of these restrictions and may be terminated by TheTableTennisClub.com at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
        
        <h2>3. Pricing and Refunds</h2>
        All pricing will be in United States Dollars, unless explicitly stated otherwise. TheTableTennisClub.com provides services to facilitate collection of membership and/or event registration fees to various organizations. The refund policy on these payments will be set by the organization. However, if and when a service fee is collected by TheTableTennisClub.com for facilitating the payment, that service fee is non refundable, unless explicitly stated otherwise.
  
        <h2>4. Age requirements</h2>
        By accepting these Terms and Conditions of Use, you represent that you are at least eighteen (18) years of age and you have the legal authority to enter into this Agreement. If you are less than eighteen (18) years of age, then your parent or legal guardian must read and accept this Agreement, your use of the Service, participating in the Service, and providing any personal information in connection with the Service on your behalf.
  
        <h2>5. Disclaimer</h2>
        The materials on TheTableTennisClub.com web site are provided "as is". TheTableTennisClub.com makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, TheTableTennisClub.com does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.
        
        <h2>6. Limitations</h2>
        In no event shall TheTableTennisClub.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on TheTableTennisClub.com Internet site, even if TheTableTennisClub.com or a TheTableTennisClub.com authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
  
        <h2>7. Revisions and Errata</h2>
        The materials appearing on TheTableTennisClub.com web site could include technical, typographical, or photographic errors. TheTableTennisClub.com does not warrant that any of the materials on its web site are accurate, complete, or current. TheTableTennisClub.com may make changes to the materials contained on its web site at any time without notice. TheTableTennisClub.com does not, however, make any commitment to update the materials.
  
        <h2>8. Links</h2>
        TheTableTennisClub.com has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TheTableTennisClub.com of the site. Use of any such linked web site is at the user's own risk.
  
        <h2>9. Site Terms of Use Modifications</h2>
        TheTableTennisClub.com may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
  
        <h2>10. Governing Law</h2>
        Any claim relating to TheTableTennisClub.com web site shall be governed by the laws of the State of Delaware without regard to its conflict of law provisions.
  
        General Terms and Conditions applicable to Use of a Web Site.
      </div>
    );
  };
};

Tos = connect(mapStateToProps, mapDispatchToProps)(Tos);

export default Tos;