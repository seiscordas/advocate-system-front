



// import { Auth, raw, skipCSRFCheck, createActionURL } from "@auth/core"
// import { headers as nextHeaders, cookies } from "next/headers"
// import { redirect } from "next/navigation"


// import type { NextAuthResult, Session } from "next-auth"
// import { NextAuthConfig } from "next-auth"

// export async function POST() {
   
//     signOut();
//     return Response.json("data")
// }

// type SignOutParams = Parameters<NextAuthResult["signOut"]>
// async function signOut(
//   options: SignOutParams[0],
//   config: NextAuthConfig
// ) {
//   const headers = new Headers(nextHeaders())
//   headers.set("Content-Type", "application/x-www-form-urlencoded")

//   const url = createActionURL(
//     "signout",
//     // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
//     headers.get("x-forwarded-proto"),
//     headers,
//     process.env,
//     config.basePath
//   )
//   const callbackUrl = options?.redirectTo ?? headers.get("Referer") ?? "/"
//   const body = new URLSearchParams({ callbackUrl })
//   const req = new Request(url, { method: "POST", headers, body })

//   console.log("===afds====asdf==asdf");

//   const res = await Auth(req, { ...config, raw, skipCSRFCheck })

//   for (const c of res?.cookies ?? []) cookies().set(c.name, c.value, c.options)

//   if (options?.redirect ?? true) return redirect(res.redirect!)

//   return res as any
// }

// export interface NextAuthResult {
//     signOut: <R extends boolean = true>(options?: {
//         /** The URL to redirect to after signing out. By default, the user is redirected to the current page. */
//         redirectTo?: string
//         /** If set to `false`, the `signOut` method will return the URL to redirect to instead of redirecting automatically. */
//         redirect?: R
//       }) => Promise<R extends false ? any : never>
//       unstable_update: (
//         data: Partial<Session | { user: Partial<Session["user"]> }>
//       ) => Promise<Session | null>
// }


