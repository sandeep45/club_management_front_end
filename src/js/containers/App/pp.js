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

class Pp extends Component {
  constructor(props) {
    super(props);
  };
  
  componentWillMount(){
    console.log("Pp Container has mounted");
    this._init();
  };
  
  componentWillReceiveProps(nextProps){
  
  };
  
  static defaultProps = {
  
  };
  
  static propTypes = {
  };
  
  _init = () => {
    console.log("in init of Pp");
    document.title = `Privacy Policy`;
  };
  
  render() {
    return (
      <div className={'container'}>
        <h1>TheTableTennisClub.com Privacy Policy</h1>
        <h3>Effective Date: 10 Jan 2018</h3>
        <p>TheTableTennisClub.com, provides an online Software as a Service platform (“Service”) that allows Sports Governing Bodies to manage their members who are athletes, coaches, officials, referees, and any other people or organizations that are associated with them (“Members”). This Privacy Policy describes how your information is collected, used and shared when you use the Service.</p>
  
        <p>The Service is intended for use by organizations in accordance with their instructions and is provided to you by your Sports governing body(s) or other organization that has authorized you access to, and use of, the Service (“Organization” or “Your Organization”).</p>
  
        <p>The Service is separate from other TableTennisClub.com services that you may use now or in the future. Those other TableTennisClub.com services are provided to you or will be provided to you in the future by TableTennisClub.com and are governed by their own terms. However, the Service is provided by Your Organization and is governed by this Privacy Policy.</p>
  
        <p>Your Organization is responsible for and administers your TableTennisClub.com user account (“Your Account”). Your Organization is also responsible for the collection and use of any data that you submit or provide through the Service and such use is governed by the terms Your Organization has in place with TableTennisClub.com.</p>
  
        <p>In addition to this privacy statement, Your Organization may have additional policies or codes of conduct which will apply in relation to your use of the Service.</p>
  
        <p>If you have any questions about your use of the Service, please contact your Organization.</p>
  
        <h2>WHAT KIND OF INFORMATION IS COLLECTED?</h2>
        <p>Your Organization will collect the following kinds of information when you, or other Members of your Organization access the Service:</p>
  
        <ul>
          <li>Your contact information, such as full name and email address;</li>
          <li>Your username and password;</li>
          <li>Your profile picture;</li>
          <li>Other documents you may upload such as passport, birth certificate, sports performance related certificates, coaching certificates;</li>
          <li>Your role (athlete, coach, official, doctor, physiotherapist, and others as they pertain to Your Organization);</li>
          <li>Other information related to your interaction with Your Organization;</li>
          <li>The content, communications and other information you provide when you use the Service, including when you sign up for an account, register for a license, pay for the license, register for events, submit your travel and accommodation details, register for sports clubs, classes, courses;</li>
          <li>Competition performance results;</li>
          <li>Content, communications and information that other people provide when they use the Service. This can include information about you, such as when event organizers upload event results for events that you participated in, athlete rankings that get calculated and posted up periodically that may include your sport-specific international, national, regional, and/or local rankings;</li>
          <li>All communications with other users of the Service;</li>
          <li>User communications, feedback, suggestions, and ideas sent to Your Organization;</li>
          <li>Billing information; and</li>
          <li>Information that you provide when you or Your Organization contact or engage platform support regarding the Service.</li>
        </ul>
  
        <h2>HOW DOES YOUR ORGANIZATION USE THIS INFORMATION?</h2>
        <p>Your organization will share the information that it collects with TableTennisClub.com, as provider of the platform, in order to allow TableTennisClub.com to provide and support the Service for Your Organization and other users and in accordance with any other instructions from your Organization. Examples of such use include:</p>
        <ul>
          <li>Communicating with users and administrators regarding their use of the Service;</li>
          <li>Enhancing the security and safety of the Service of Your Organization and other users, such as by investigating suspicious activity or violations of applicable terms or policies;</li>
          <li>Personalizing your and Your Organization’s experiences;</li>
          <li>Developing new tools, products or services within the Service for Your Organization;</li>
          <li>Associating activity on the Service across different devices operated by the same individual to improve the overall operation of the Service;</li>
          <li>To identify and fix bugs that may be present; and</li>
          <li>Conducting data and system analytics, including research to improve the Service.</li>
        </ul>
  
        <h2>GDPR INFORMATION FOR EU INDIVIDUALS</h2>
        <h2>USER'S RIGHTS</h2>
        <p>To the extent required by the law of your jurisdiction, you may have below rights. Before you exercise below rights, you may consult your legal counsel if the laws of your jurisdiction stipulate below rights.</p>
        <table border="1">
          <tr><td>Rights</td><td>Content</td></tr>
          <tr><td>The right to be informed</td><td>	The User has the right to be provided with clear, transparent and easily understandable information about how Simply Compete collects and uses personal data and its rights. This is the reason why Simply Compete is providing the User with the information in this privacy policy.</td></tr>
          <tr><td>The right of access</td><td>	The User has the right to obtain access to its personal data (if Simply Compete is processing it), and other certain information (similar to that provided in this privacy policy).</td></tr>
          <tr><td>The right to rectification</td><td>	The User is entitled to have its personal data corrected if it’s inaccurate or incomplete.</td></tr>
          <tr><td>The right to erasure</td><td>	This ‘the right to be forgotten’ enables the User to request the deletion or removal of its personal data where there’s no compelling reason for Simply Compete to keep using it. This is not a general right to erasure; there are exceptions.</td></tr>
          <tr><td>The right to restrict processing</td><td>	Under certain circumstances, the User has the rights to ‘block’ or suppress further use of its personal data.</td></tr>
          <tr><td>The right to data portability</td><td>	The User has the rights to receive its personal data provided to Simply Compete in a structured, commonly used and machine readable format and has the right to transmit those data to another controller.</td></tr>
          <tr><td>The right to object to processing</td><td>	The User has the right to object, on grounds relating to its particular situation, at any time, to the processing of its personal data.</td></tr>
          <tr><td>The right to lodge a complaint</td><td>	The User has the right to lodge a complaint about the way Simply Compete handles or processes its personal data with its national supervisory authority (in France, the CNIL).</td></tr>
          <tr><td>The right to withdraw consent</td><td>	If the user has given its consent for a specific processing of its personal data implemented by Simply Compete, the User has the right to withdraw its consent at any time. In case the User does so, it does not mean that anything Simply Compete has done with the User’s personal data with its consent up to that point is unlawful).</td></tr>
          <tr><td>The right to define instructions</td><td>	The User has the right to define general or specific instructions regarding storage, deletion and use of its personal data after death.</td></tr>
        </table>
        <h2>DISCLOSURE OF INFORMATION</h2>
        <p>Your Organization discloses the information collected in the following ways:</p>
        <ul>
          <li>To third-party service providers that assist in providing the Service or part of the Service;</li>
          <li>To third-party apps, websites or other services that you can connect to through the Service;</li>
          <li>In connection with a substantial corporate transaction, such as the transfer of the Service, a merger, consolidation, asset sale or in the unlikely event of bankruptcy or insolvency;</li>
          <li>To protect the safety of any person, to address fraud, security, or technical issues; and</li>
          <li>In connection with a subpoena, warrant, discovery order, or other request or order from a law enforcement agency.</li>
        </ul>
        <h2>ACCESSING AND MODIFYING YOUR INFORMATION</h2>
        <p>You and Your Organization may access, correct or delete information that you have uploaded to the Service using the tools within the Service (for example, editing your profile information, or via the event registration tool). If you are not able to do so using the tools provided in the Service, you should contact Your Organization directly to access or modify your information.</p>
  
        <h2>LIMITING DATA USAGE</h2>
        <p>TheTableTennisClub.com operates as a data processor under the strict direction of Your Organization who is the data controller in how we process / store / display your data. If you would like to opt-out / opt-in of certain processing or display of your data, please contact Your Organization.</p>
  
        <h2>THIRD-PARTIES</h2>
        <p>TheTableTennisClub.com does not transfer any data or allow access to data by third party business partners or service provides. Your Organization however may do so. You should refer to Your Organization’s Privacy Policy on information regarding the third parties they may transfer your data to and whether they provide any opt-in and opt-out choices to you.</p>
  
        <h2>ACCOUNT CLOSURE</h2>
        <p>If you would like to stop using the Service, you should contact your Organization. Similarly, if you stop work associating with Your Organization, Your Organization may suspend Your Account and/or delete any information associated with Your Account.</p>
  
        <p>It typically takes about 90 days to delete an account after account closure, but some information may remain in backup copies for a reasonable period of time. Please note that content you create and share on the Service is owned by Your Organization and may remain on the Service and be accessible even if Your Organization deactivates or terminates Your Account.</p>
  
        <h2>GDPR RECOURSE FOR EU INDIVIDUALS</h2>
        <p>If you are an EU individual with questions or concerns regarding the handling of your personal data pursuant to GDPR regulations, we encourage you to contact Simply Compete at: mistersingh179@gmail.com</p>
  
        <p>You also have the right to contact your local Data Protection Authority. For more information on this option and to locate your DPA go to: http://ec.europa.eu/justice/article-29/structure/data-protection-authorities/index_en.htm</p>
  
        <h2>PRIVACY SHIELD FOR EU AND SWISS INDIVIDUALS WHOSE DATA IS TRANSFERRED TO THE US</h2>
        <p>TheTableTennisClub.com complies with the EU-US Privacy Shield Framework and the Swiss-US Privacy Shield Framework as set forth by the US Department of Commerce regarding the collection, use, and retention of personal information from European Union member countries and Switzerland transferred to the United States pursuant to Privacy Shield.  TheTableTennisClub.com has certified that it adheres to the Privacy Shield Principles with respect to such data. If there is any conflict between the policies in this privacy policy and data subject rights under the Privacy Shield Principles, the Privacy Shield Principles shall govern. To learn more about the Privacy Shield program, and to view our certification page, please visit https://www.privacyshield.gov/</p>
  
        <p>Pursuant to the Privacy Shield you have the right to access your personal data. Please refer to the “Accessing and Modifying Your Information” section of this privacy policy for details on how to exercise this right.</p>
  
        <p>Since TheTableTennisClub.com does not plan to transfer personal information to third parties, the Privacy Shield provision regarding liability for the actions of agent processors does not apply. If this practice should change in the future we will update this policy to identify the third parties and provide individuals with opt-out or opt-in choice, as applicable.</p>
  
        <p>Note that Simply Compete may be required to release EU and Swiss personal data in response to lawful requests by public authorities including to meet national security and law enforcement requirements.</p>
  
        <h2>PRIVACY SHIELD INDEPENDENT RECOURSE MECHANISM</h2>
        <p>In compliance with the Privacy Shield Principles, TheTableTennisClub.com commits to resolve complaints about your privacy and our collection or use of your personal information transferred to the United States pursuant to Privacy Shield. European Union and Swiss individuals with Privacy Shield inquiries or complaints should first contact TheTableTennisClub.com at: mistersingh179@gmail.com</p>
  
        <p>TheTableTennisClub.com has further committed to refer unresolved privacy complaints under the Privacy Shield Principles to an independent dispute resolution mechanism, the BBB EU PRIVACY SHIELD, operated by the Council of Better Business Bureaus. If you do not receive timely acknowledgment of your complaint, or if your complaint is not satisfactorily addressed, please visit www.bbb.org/EU-privacy-shield/for-eu-consumers  for more information and to file a complaint. This service is provided free of charge to you.</p>
  
        <p>If your Privacy Shield complaint cannot be resolved through the above channels, under certain conditions, you may invoke binding arbitration for some residual claims not resolved by other redress mechanisms.  See Privacy Shield Annex 1 at https://www.privacyshield.gov/article?id=ANNEX-I-introduction</p>
  
        <p>The Federal Trade Commission has jurisdiction TheTableTennisClub.com’s compliance with the Privacy Shield.</p>
  
        <h2>CHANGES TO THE PRIVACY POLICY</h2>
        <p>Occasionally, we may change this privacy policy (or other documents related to privacy policy) to allow Simply Compete to use or share your personal data in a different way. If we do, the links to the policy on our websites (which are generally found in the footer of the website) will indicate that the policy has been changed. For new users, the change will become effective upon posting. For existing users, if the change is significant, it will become effective 30 days after posting. We encourage you to periodically review the privacy policy for the latest information on our privacy practices.</p>


      </div>
    );
  };
};

Pp = connect(mapStateToProps, mapDispatchToProps)(Pp);

export default Pp;