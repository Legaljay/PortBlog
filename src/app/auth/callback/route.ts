// import { NextResponse } from 'next/server'
// // The client you created from the Server-Side Auth instructions
// import { createClient } from '@/utils/supabase/server'

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url)
//   const code = searchParams.get('code')
//   // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get('next') ?? '/'

//   if (code) {
//     const supabase = createClient()
//     const { error } = await supabase.auth.exchangeCodeForSession(code)
//     if (!error) {
//       const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
//       const isLocalEnv = process.env.NODE_ENV === 'development'
//       if (isLocalEnv) {
//         // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//         return NextResponse.redirect(`${origin}${next}`)
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`)
//       } else {
//         return NextResponse.redirect(`${origin}${next}`)
//       }
//     }
//   }

//   // return the user to an error page with instructions
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`)
// }


import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { Database } from "@/lib/types/supabase";

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const isAuth = cookies().get("supabase-auth-token");

	if (isAuth) {
		return NextResponse.redirect(requestUrl.origin);
	}

	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const cookieStore = cookies();
		const supabase = createServerClient<Database>(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					get(name: string) {
						return cookieStore.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						cookieStore.set({ name, value, ...options });
					},
					remove(name: string, options: CookieOptions) {
						cookieStore.set({ name, value: "", ...options });
					},
				},
			}
		);

		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			return NextResponse.redirect(requestUrl.origin + next);
		}
	} else {
		console.log("no code?");
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(requestUrl.origin + "/auth/error");
}