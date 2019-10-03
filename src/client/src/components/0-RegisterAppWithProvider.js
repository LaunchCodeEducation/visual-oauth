// const AuthStepDescription = () => (
//   <>
//     <Message.Header content="User authenticates and authorizes with the Provider" />
//     <Message.List>
//       <Message.Item
//         content={
//           <>
//             (Before) The {stepIcons.app.inline} registered with the{" "}
//             {stepIcons.provider.inline} to gain a unique <b>client ID</b> and
//             define its <b>redirect URI</b>
//           </>
//         }
//       />
//       <Message.Item
//         content={
//           <>
//             (Before) The {stepIcons.app.inline} defined the permissions (
//             <b>authorization</b>) for User data access and management with the{" "}
//             {stepIcons.provider.inline}
//           </>
//         }
//       />
//       <Message.Item
//         content={
//           <>
//             The {stepIcons.user.inline} <b>authenticates</b> their identity with
//             the {stepIcons.provider.inline} through a link containing the{" "}
//             {stepIcons.app.inlineCustom("App's")} <b>client ID</b> and{" "}
//             <b>redirect URI</b>
//           </>
//         }
//       />
//       <Message.Item
//         content={
//           <>
//             The {stepIcons.user.inline} chooses to <b>authorize</b> the{" "}
//             {stepIcons.app.inlineCustom("App's")} permission requests by
//             accepting them on the {stepIcons.provider.inline} service
//           </>
//         }
//       />
//       <Message.Item
//         content={
//           <>
//             The {stepIcons.provider.inline} then <b>redirects (step 2)</b> the{" "}
//             {stepIcons.user.inline} to the <b>redirect URI</b> location
//           </>
//         }
//       />
//       <Message.Item
//         content={
//           <>
//             Notice with this flow the {stepIcons.user.inline}{" "}
//             <b>never exposes their login credentials</b> to the{" "}
//             {stepIcons.app.inlineCustom("App Server")}
//           </>
//         }
//       />
//     </Message.List>
//     <Divider />
//     <Message.List>
//       <Message.Item
//         content="Click the button below to begin the OAuth authorization code flow
//         process"
//       />
//       <Message.Item
//         content="The minimal amount of user data will be requested, none of this is
//         stored or used for any purpose beyond displaying it to you in the final step of the flow"
//       />
//       <Message.Item
//         content="You will be redirected back to this page afterwards to learn about the
//         next steps"
//       />
//     </Message.List>
//     <Divider hidden />
//     <AuthButton />
//   </>
// );
