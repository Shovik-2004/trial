import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import {
  Moon,
  Sun,
  LogOut,
  User,
  Info,
  MessageCircle,
  Bell,
  Lock,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { colors, theme, setTheme, isDark } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.primaryText,
            },
          ]}
        >
          Settings
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.avatarPlaceholder,
              {
                backgroundColor: colors.primary + '20',
              },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                {
                  color: colors.primary,
                },
              ]}
            >
              {user?.username?.[0] || 'U'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text
              style={[
                styles.userName,
                {
                  color: colors.primaryText,
                },
              ]}
            >
              {user?.username || 'User'}
            </Text>
            <Text
              style={[
                styles.userEmail,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              {user?.email || 'user@example.com'}
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Appearance
          </Text>
          <View
            style={[
              styles.optionItem,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.optionContent}>
              {isDark ? (
                <Moon size={22} color={colors.primary} />
              ) : (
                <Sun size={22} color={colors.primary} />
              )}
              <Text
                style={[
                  styles.optionText,
                  {
                    color: colors.primaryText,
                  },
                ]}
              >
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.primary + '70' }}
              thumbColor={isDark ? colors.primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Account
          </Text>
          <View
            style={[
              styles.optionsCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: colors.primary + '15',
                    },
                  ]}
                >
                  <User size={18} color={colors.primary} />
                </View>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: colors.primaryText,
                    },
                  ]}
                >
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />

            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: colors.secondary + '15',
                    },
                  ]}
                >
                  <Lock size={18} color={colors.secondary} />
                </View>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: colors.primaryText,
                    },
                  ]}
                >
                  Change Password
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />

            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: colors.accent + '15',
                    },
                  ]}
                >
                  <Bell size={18} color={colors.accent} />
                </View>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: colors.primaryText,
                    },
                  ]}
                >
                  Notifications
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Support
          </Text>
          <View
            style={[
              styles.optionsCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: colors.primary + '15',
                    },
                  ]}
                >
                  <Info size={18} color={colors.primary} />
                </View>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: colors.primaryText,
                    },
                  ]}
                >
                  Help Center
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />

            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: colors.secondary + '15',
                    },
                  ]}
                >
                  <MessageCircle size={18} color={colors.secondary} />
                </View>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: colors.primaryText,
                    },
                  ]}
                >
                  Contact Support
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: colors.error + '10',
              borderColor: colors.error + '30',
            },
          ]}
          onPress={handleSignOut}
        >
          <LogOut size={20} color={colors.error} />
          <Text
            style={[
              styles.logoutText,
              {
                color: colors.error,
              },
            ]}
          >
            Log Out
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.versionText,
            {
              color: colors.secondaryText + '80',
            },
          ]}
        >
          Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  profileInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
    fontFamily: 'Inter-SemiBold',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
  },
  optionsCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  optionRow: {
    padding: 16,
  },
  divider: {
    height: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    fontFamily: 'Inter-SemiBold',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});