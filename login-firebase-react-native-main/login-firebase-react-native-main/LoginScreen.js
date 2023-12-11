import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const onLogin = async () => {
  try {
    const user = await GoogleSignin.signIn();
    return user;
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    throw error;
  }
};

export const onLogout = () => {
  GoogleSignin.signOut();
};

GoogleSignin.configure({
  webClientId: "CHAVE_FIREBASE_CLIENTE",
});

// Telas
const LoginScreen = ({ login }) => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const handleLoginUser = async () => {
    try {
      setIsSigninInProgress(true);
      const user = await onLogin();
      console.log(user);
      login(true);
    } catch (error) {
      console.error("Erro durante o login:", error);
    } finally {
      setIsSigninInProgress(false);
    }
  };

  return (
    <View style={styles.layout}>
      {isSigninInProgress && <ActivityIndicator />}
      <Text style={styles.title}>Login</Text>
      <Button
        title="Entrar"
        onPress={() => handleLoginUser()}
        style={styles.button}
      />
    </View>
  );
};

const HomeScreen = ({ login }) => (
  <View style={styles.layout}>
    <Text style={styles.title}>Home</Text>
    <Button
      title="Sair"
      onPress={() => onLogout().then(() => login(false))}
      style={styles.button}
    />
  </View>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <HomeScreen login={setIsAuthenticated} />
      ) : (
        <LoginScreen login={setIsAuthenticated} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
});

export default App;
