import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert, Image } from 'react-bootstrap'; // Import Image component
import Loader from '../components/Loader'; // Adjust the path if needed
import Message from '../components/Message'; // Adjust the path if needed
import '../styles/RecoveryPage.css'; // Import the CSS file

const Recovery = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Verify OTP and Reset Password
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // For showing loader
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/forgot-password', { email });
            setStep(2);
            setSuccessMessage('OTP sent to your email.'); // Set success message
        } catch (err) {
            const errorMessage = err.response?.data || 'Error sending OTP. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/reset-password', { email, otp, newPassword });
            setSuccessMessage('Password reset successfully. Please log in.');
            navigate('/login', { state: { message: 'Password reset successfully. Please log in.' } });
        } catch (err) {
            const errorMessage = err.response?.data || 'Invalid OTP or error resetting password. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recovery-page-container">
            <div className="background-image-container">
                <Image
                    src="/images/forgot.jpg"
                    alt="Background"
                    className="background-image"
                />
            </div>
            <Container className="my-4 recovery-form-container">
                {loading && <Loader />} {/* Show loader while loading */}
                {successMessage && <Message variant="success">{successMessage}</Message>} {/* Show success message */}
                {step === 1 ? (
                    <Form onSubmit={handleEmailSubmit}>
                        <h2>Forgot Password</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="email" className="my-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send OTP
                        </Button>
                    </Form>
                ) : (
                    <Form onSubmit={handleResetPassword}>
                        <h2>Reset Password</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="otp" className="my-3">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="newPassword" className="my-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                )}
            </Container>
        </div>
    );
};

export default Recovery;
