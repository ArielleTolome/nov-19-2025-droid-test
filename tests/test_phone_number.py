from playwright.sync_api import Page, expect
import os

def test_phone_number_formatting(page: Page):
  """
  This test verifies that the phone number input field correctly formats
  phone numbers with more than 10 digits without truncating them.
  """
  # 1. Arrange: Go to the contact page.
  path = "file://" + os.path.abspath("contact.html")
  page.goto(path)

  # 2. Act: Find the phone number input and enter a long phone number.
  phone_input = page.locator('#phone')
  phone_input.type("123456789012345")

  # 3. Assert: Confirm that the value is formatted correctly and not truncated.
  expect(phone_input).to_have_value("(123) 456-789012345")
