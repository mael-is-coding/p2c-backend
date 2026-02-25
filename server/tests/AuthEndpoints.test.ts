import { DMLQueryResult, DMLQueryResultZod } from "../model/DMLQueryResult.ts";
import { LoginModelWithEmailType } from "../model/LoginModel.ts";
import { ServerResponseZod } from "../model/LoginResponse.ts";
import { PartialUserTypeZod, UserType, UserTypeZod } from "../model/User.ts";
import { assertEquals, assertNotEquals } from "@std/assert";

const good_usr: UserType = {
    name: "Cosmos-Test",
    username: "Cosmos",
    email: "auto@test.domain",
    password: "cosmos-for-tests",
    phonenumber: "06 12 12 12 12",
    profile_picture: ""
}

const good_usr_login: LoginModelWithEmailType = {
    email: "auto@test.domain",
    password: "cosmos-for-tests"
}

// /user/:id
Deno.test('/signup should work with valid payload', async () => {
    const res = await fetch("http://localhost:3000/signup",
        {
            body: JSON.stringify(good_usr),
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            method: "POST"
        }
    )
    const json = await res.json();
    const parsed_user = ServerResponseZod.safeParse(json);

    assertEquals(parsed_user.error, undefined, `User parsing contains errors even if payload is supposedly valid : \n${parsed_user.error}`);
    assertEquals(parsed_user.data?.s_success, true, `Server gives unsuccessful response on SIGNUP with valid payload`);
    if (!parsed_user.error && parsed_user.data.s_success) {
        const user_data = UserTypeZod.safeParse(parsed_user.data.s_data);
        if (!user_data.error) {
            assertEquals(user_data.data?.email, good_usr.email, "User data sent to server for signup and received from signup success don't match.");
            assertNotEquals(user_data.data?.password, undefined, "Password field present is sent by server");
        }
    }
});

Deno.test('/signup should not work with user having existing email', async () => {
    const res = await fetch("http://localhost:3000/signup",
        {
            body: JSON.stringify(good_usr),
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            method: "POST"
        }
    )
    const json = await res.json();
    const parsed_user = ServerResponseZod.safeParse(json);

    assertEquals(parsed_user.data?.s_success, false, `Server gives successful response on SIGNUP with existing credentials`);
});

Deno.test('/login should work with valid payload on an existing user', async () => {
    const res = await fetch("http://localhost:3000/login",
        {
            body: JSON.stringify(good_usr_login),
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            method: "POST"
        }
    )

    const json = await res.json();
    const parsed_user = ServerResponseZod.safeParse(json);

    assertEquals(parsed_user.error, undefined, `User parsing contains errors, even if payload is supposedly valid : \n${parsed_user.error}`);
    assertEquals(parsed_user.data?.s_success, true, `Server gives unsuccessful response on LOGIN with valid payload`);
    if (!parsed_user.error && parsed_user.data.s_success) {
        const user_data = PartialUserTypeZod.safeParse(parsed_user.data.s_data);
        
        assertEquals(user_data.data?.email, good_usr.email, "User data sent to server for signup and received from signup success don't match.");
        assertEquals(user_data.data?.password, undefined, "Password is sent from the server");
    }
});

Deno.test('DELETE /user/:username should delete an existing user', async () => {
    const res = await fetch(`http://localhost:3000/user/${good_usr.username}`,
        {
            method: "DELETE"
        }
    )

    const json = await res.json();
    const parsed_response = ServerResponseZod.safeParse(json);
    if (!parsed_response.error && parsed_response.data.s_success) {
        const parsed_result = DMLQueryResultZod.safeParse(parsed_response.data.s_data);

        parsed_response.data.s_data
        assertEquals(parsed_result.error, undefined, `Response parsing contains errors even if payload is supposedly valid : \n${parsed_result.error}`);
        assertEquals(typeof (parsed_response.data.s_data as DMLQueryResult).affected_rows, "number" , `DML server endpoint does not send a dml response containing affected_rows of type number`);
    }
});