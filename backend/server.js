
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getAuth } = require("firebase-admin/auth");

// Firebase Admin Setup
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
    console.error("Paystack secret key is missing. Check your .env file.");
    process.exit(1);
}

const app = express();

// Middleware
app.use(cors({
    origin: [
        "https://globalethosinternational.com",
        "https://www.globalethosinternational.com"
    ]
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("GET IN Institution Payment Server is running!");
});

// Firebase Authentication Middleware
async function verifyFirebaseToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "You must be logged in to continue."
            });
        }

        const idToken = authHeader.split("Bearer ")[1];

      const decodedToken = await getAuth().verifyIdToken(idToken);

        req.user = decodedToken;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired login session."
        });
    }
}


// Paystack Payment Initialization
const axios = require("axios");

const programs = {
    "workshop": {
        name: "Workshop / Mini Training & Mentorship",
        amount: 5000000
    },
    "short-courses": {
        name: "Short Courses",
        amount: 3000000
    },
    "certification": {
        name: "Certification Courses",
        amount: 10000000
    }
};

app.post(
    "/api/payments/initialize",
    verifyFirebaseToken,
    async (req, res) => {
    try {
        const { programId } = req.body;
const email = req.user.email;

        const program = programs[programId];

        if (!program || !email) {
            return res.status(400).json({
                message: "A valid program and email are required."
            });
        }

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email: email,
                amount: program.amount,
                currency: "NGN",
               callback_url: "https://globalethosinternational.com/payment-success.html",
              metadata: {
    userId: req.user.uid,
    programId: programId,
    programName: program.name
}
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            authorization_url: response.data.data.authorization_url,
            reference: response.data.data.reference
        });

    } catch (error) {
        console.error(
            "Payment initialization error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Unable to initialize payment."
        });
    }
});

// Paystack Payment Verification
app.post(
    "/api/payments/verify",
    verifyFirebaseToken,
    async (req, res) => {
        try {
            const { reference } = req.body;

            if (!reference) {
                return res.status(400).json({
                    message: "Payment reference is required."
                });
            }

            const response = await axios.get(
                `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
                {
                    headers: {
                        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
                    }
                }
            );

    const payment = response.data?.data;

if (response.data?.status !== true || !payment) {
    return res.status(400).json({
        message: "Unable to retrieve payment details from Paystack."
    });
}

const programId = payment.metadata?.programId;
const program = programs[programId];

if (
    response.data.status !== true ||
    !payment ||
    payment.status !== "success" ||
    payment.reference !== reference ||
    !program ||
    payment.metadata?.userId !== req.user.uid ||
    payment.customer?.email !== req.user.email ||
    payment.amount !== program.amount ||
    payment.currency !== "NGN"
) {
    return res.status(400).json({
        message: "Payment verification failed. Please contact support if you were charged."
    });
}

           // Save verified enrolment to Firestore

const enrollmentRef = db.collection("enrollments").doc(reference);

const result = await db.runTransaction(async (transaction) => {

    const existingEnrollment = await transaction.get(enrollmentRef);

    // Prevent duplicate enrolments from the same payment
  if (existingEnrollment.exists) {
    const existingData = existingEnrollment.data();

    if (existingData.userId !== req.user.uid) {
        throw new Error("Payment reference belongs to another user.");
    }

    return "exists";
}

    transaction.set(enrollmentRef, {
        userId: req.user.uid,
        email: req.user.email,
        programId: programId,
        programName: program.name,
        amount: payment.amount,
        currency: payment.currency,
        reference: payment.reference,
        status: "paid",
        paidAt: FieldValue.serverTimestamp()
    });

    return "created";
});

if (result === "exists") {
    return res.json({
        message: "Payment was already verified.",
        reference: payment.reference,
        programName: program.name
    });
}

res.json({
    message: "Payment verified and enrolment saved successfully.",
    reference: payment.reference,
    programName: program.name
});

        } catch (error) {
            console.error(
                "Payment verification error:",
                error.response?.data || error.message
            );

            res.status(500).json({
                message: "Unable to verify payment."
            });
        }
    }
);


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
