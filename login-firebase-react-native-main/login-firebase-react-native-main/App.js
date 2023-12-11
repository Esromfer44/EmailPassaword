import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const LoginScreen = ({ login }) => (
  <View style={styles.layout}>
    <Text style={styles.title}>Login</Text>
    <Button title="Entrar" onPress={() => login(true)} />
  </View>
);

const HomeScreen = ({ login }) => (
  <View style={styles.layout}>
    <Text style={styles.title}>Home</Text>
    <Button title="Sair" onPress={() => login(false)} />
  </View>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <View style={[styles.container, isAuthenticated && styles.authenticatedContainer]}>
      {isAuthenticated ? <HomeScreen login={setIsAuthenticated} /> : <LoginScreen login={setIsAuthenticated} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authenticatedContainer: {
    backgroundColor: "#e0e0e0",
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
});

export default App;
