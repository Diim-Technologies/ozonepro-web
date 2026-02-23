import { Box, Heading } from "@chakra-ui/react";
// import Sidebar from "./Sidebar";
import TermSideBar from "../../components/TermSideBar";

const Terms = () => {
  const sectionContent = [
    {
      id: "section1",
      heading: "1. INTRODUCTION",

      content1:
        "1.1 Welcome to Ozone Pro-Financial Corporation (Hereinafter referred to as the Company). We are a money business services corporation operating in Canada with registration number (2025189164), authorized and regulated by the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) to deal in but not limited to virtual currencies, currency exchange, international money transfers, bookkeeping, tax filing and financial advisory services. Our Services are subject to change, modification, or discontinuation at any time without prior notice.",
      content2:
        " 1.2 In this Terms of Service (Hereinafter referred to as ‘User Agreement’), “The Company” “we” “us” and “our” refers to Ozone Pro-Financial Corporation, together with its employees, directors, successors, assigns and successors-in-interest. The terms 'you' and 'your' refer to users of some or all of our services as described in this User Agreement, as senders or recipients other users, clients or visitors to our website.",
      content3:
        " 1.3 This User Agreement is effective from the date on which you first access, register or use the Service. We reserve the right to change this User Agreement from time to time without notice by posting an updated copy of this User Agreement to the Site. You acknowledge and agree that it is your responsibility to review this User Agreement periodically to familiarize yourself with any modifications. Your continued use of this site after such modifications will constitute acknowledgment and agreement of the modified terms and conditions.",
      content4:
        " 1.4 Unless otherwise specified by Ozone Pro-Financial Corporation, all modifications shall take effect automatically upon publication, and shall become part of this User Agreement. You will be aware of any changes to the terms and conditions immediately they are made, and by continuing to access or use our website, you will be deemed to have agreed to accept and be bound by any modifications to this Agreement.",
      content5:
        "1.5 Changes to these terms and conditions will only be effective from the date they are made and will not change the terms on which you previously used the Service.",
      content6:
        " 1.6 It is highly recommended that you read this User Agreement carefully before consenting to it, as there are certain rights which may be affected or obligations that may be required from you by this User Agreement. By accessing and using our website, you accept and agree to this User Agreement. You must indicate your consent to this User Agreement by ticking that you have “Read and Understand” both the Terms and Conditions and Privacy Policy of The Company and ensuring all sections have been fully and accurately completed and clicking on the “SUBMIT” or “ACCEPT” button. If you do not, we may not be able to provide you the appropriate access.",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section3",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      contentArray:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
    {
      id: "section2",
      heading: "2 OUR FUNCTIONS",

      content1:
        "2.1   Subject   to   this   User   Agreement,   Ozone-Pro   Financial   Corporation   agree   to   provide   the services contained in clause 1.1 to you using reasonable care, equity and fairness.",
      content2:
        " 2.2 Ozone Pro-Financial Corporation seek to eliminate fraud of any sort from our services and to maintain the highest level of integrity. ",
      content3:
        " 2.3   We   begin   with   a   sophisticated   system   of   verifying   that   you   are   who   you   say   you   are.Successful and complete know your client (KYC) is a prerequisite to being able to process any kind of transaction with us.",
      content4:
        "2.4 We are not under any obligation to process any particular transaction. Ozone Pro-Financial Corporation   has   the   discretion   to   choose   whether   or   not   to   accept   the   offer   to   process   that transaction. If we decide not to process the transaction, we will notify you promptly of that decision. If we choose to proceed with the transaction, we may still suspend or cancel it in our discretion and notify you accordingly.",
      content5:
        "2.5 Instances where we may refuse, suspend or even cancel any transaction request where we are required to do so by law or where we believe that such business transaction is being used, whether by you or the sending/receiving party, in furtherance of illegal, fraudulent or prohibited activities.   For   example,   where   we   have   reason   to   believe   processing   the   transaction   request would violate anti-money laundering or counter-terrorism financing laws and regulations, we believe you are using the Service to purchase goods or services from third parties you do not know or trust, we are unable to verify your identity or where we reasonably believe allowing your business transaction would be in breach of this User Agreement or any applicable laws, rules or regulations. ",
      content6:
        "2.6   Where   Ozone   Pro-Financial   Corporation   has   refused,   suspended   or   cancelled   your transaction request, we may also, at our discretion, temporarily or permanently suspend your registration.",
      content7:
        "2.7 We may impose limits on transaction amount in any particular transaction and may do so either on a per transaction basis or on an aggregate basis, and either in respect of one payment instrument or on related sets of payment instruments. We reserve the right, in our sole and absolute discretion, to change the payment instruments that we accept, at any time.",
      content8:
        "2.8 We will attempt to process transactions promptly, but any transaction may be delayed or cancelled for a number of reasons including but not limited to: unsatisfactory efforts to verify your identity; to validate your transaction instructions; to contact you; or due to variations in business hours and currency availability; or otherwise, to comply with applicable law.",
      content9:
        "2.9 We may send and receive notifications in relation to transactions by email and SMS and will provide you with information after receipt of a transaction request enabling you to identify the transaction,   along   with   details   of   the   amount   of   the   transaction   in   the   currency   used   in   the transaction request, our service fee, exchange rate and the date on which the transaction request was received.",
      content10:
        "2.10 We will attempt to provide you with up-to-date information regarding the location and opening hours of our service providers by means of information on our website. However, you agree that The Company shall not be held responsible for any inaccuracies that may appear in that   information   or   any   consequential   loss   which   may   result   from   incorrect   or   incomplete information.",
      content11:
        "2.11   Ozone   Pro-Financial   Corporation   reserves   the   right   to   modify   or   discontinue   this   User Agreement or any part thereof without notice, at any time and from time to time.,",
    },
  ];
  return (
    <Box display="flex">
      {/* <TermSideBar getTab={(tabNumber) => setTab(tabNumber)} /> */}
      <Box ml={200} p={4} w="100%" overflow="auto">
        {sectionContent.map((section) => (
          <Box id={section.id} mb={8} key={section.id}>
            {section.heading}
            <Box>{section.content1}</Box>
            <Box>{section.content2}</Box>
            <Box>{section.content3}</Box>
            <Box>{section.content4}</Box>
            <Box>{section.content5}</Box>
            <Box>{section.content6}</Box>
            <Box>{section.content7}</Box>
            <Box>{section.content8}</Box>
            <Box>{section.content9}</Box>
            <Box>{section.content10}</Box>
            <Box>{section.content11}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Terms;
